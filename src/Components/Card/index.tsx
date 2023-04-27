import {Card as Cards, CardMedia, Typography} from '@material-ui/core'
import "./Card.css";

type cardProps = {
    id: string;
    img: string;
    name: string;
}

const Card:React.FC<cardProps> = ({id, img, name}) => {
    return (
        <Cards
            id={'"' + id + '"'}
            sx={{boxShadow: 'none', backgroundColor: 'transparent'}}
        >
            <CardMedia image={img} component="img" sx={{pointerEvents: "none"}}/>
            <Typography sx={{borderTop: "1px solid #e5e5e5", transition: "all 0.2s linear", padding: "10px 0px", paddingLeft: '20px', fontFamily: 'default'}}>
                {name}
            </Typography>
        </Cards>
    );
}
export default Card;