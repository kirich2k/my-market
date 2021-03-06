import "./Card.css";

type cardProps = {
    id: string;
    img: string;
    name: string;
}

const Card:React.FC<cardProps> = ({id, img, name}) => {
    return (
        <div
            className="article__catalog__container__inner__card"
            id={'"' + id + '"'}
        >
            <img src={img} alt={'"' + id + '"'} draggable="false" />
            <span className="article__catalog__container__inner__card__description">
                {name}
            </span>
        </div>
    );
}
export default Card;