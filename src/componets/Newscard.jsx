import React,{useState,useEffect,createRef} from 'react';
import { Card,  CardActions,CardActionArea, CardContent, CardMedia , Button, Typography } from '@material-ui/core';
import classNames from 'classnames';
import useStyle from './Newscard_style';


const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage},i, activeArticles}) => {
 const Classes = useStyle();
 const [elRefs , setelRefs] = useState([]);
 const scrollToRef = (ref) => window.scroll(0,ref.current.offsetTop - 50);

 useEffect(()=>{
 setelRefs((refs)=>Array(20).fill().map((_ , j)=>refs[j] || createRef()));
 }, [])

 useEffect(()=>{

    if(i===activeArticles && elRefs[activeArticles]){
        scrollToRef(elRefs[activeArticles]);
    } 
 },[i,activeArticles,elRefs])
return(
<>
<Card ref={elRefs[i]} className={classNames( Classes.card , activeArticles===i?Classes.activeCard:null)}>
    <CardActionArea href={url} target="_blank">
        <CardMedia className={Classes.media} image={urlToImage||"/image-photo/watching-news-articles-on-laptop-online-1921198922"}/>
        <div className={Classes.details}>
             <Typography variant='body2' color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString}</Typography>
             <Typography variant='body2' color="textSecondary" component="h2">{source.name}</Typography>
        </div>
           <Typography className={Classes.title} gutterBottom variant='h5'>{title}</Typography>
           <CardContent>
               <Typography variant='body2' color="textSecondary" component="p">{description}</Typography>
           </CardContent>
    </CardActionArea>
    <CardActions className={Classes.cardActions}>
        <Button size="small" color="primary">
        Learn More
        </Button>
           <Typography variant='h5' color="textSecondary">{i+1}</Typography>
    </CardActions>
</Card>



</>

)


}
export default NewsCard;