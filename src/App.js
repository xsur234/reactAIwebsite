import React,{ useState,useEffect} from "react";
import wordsToNumbers from 'words-to-numbers';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './componets/NewsCards';
import useStyles from './App_style';

const alanKey = '6cb611e57b27c153ce5b03d29a27b9c22e956eca572e1d8b807a3e2338fdd0dc/stage';

const alanLogoSrc = '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQv7qJil5iqbi99w7ufQL-erTXAKbcuutKNA&usqp=CAU';

const App = ()=>{

    const [newsArticles, setnewsArticles] = useState([]);
    const[activeArticles, setactiveArticles] = useState(-1);
    const Classes = useStyles();
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles,number
            })=>{
                if(command==='newHeadlines'){
                    setnewsArticles(articles);
            
                }
                else if(command==='highlight'){
                setactiveArticles((prevactiveArticle)=>prevactiveArticle+1);
                }
                else if(command==='open'){
                    const parsedNumber = number.length>2 ? wordsToNumbers(number,{fuzzy: true}): number;
                    const article = articles[parsedNumber-1];

                    if(parsedNumber>20){
                        alanBtn().playText('please try  that again');
                    }
                    else if(article){
                        
                        window.open(article.url,'_blank'); 
                        alanBtn().playText('Opening...');
                    }
                    
                    
                }
            }
        })
    },[])
    return(
        <>

            <div className={Classes.logoContainer}>
              <img  src={ alanLogoSrc }className={Classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticles={activeArticles}/>
        </>
    )
};

export default App;