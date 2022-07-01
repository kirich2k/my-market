import ContentLoader from "react-content-loader";

const Loading = () => (
    <ContentLoader
        className="items__container__product__inner"
        speed={3}
        width={270}
        height={420}
        viewBox="0 0 270 420"
        backgroundColor="#ffffff"
        foregroundColor="#f6f6f6"
    >
        <rect x="0" y="0" rx="15" ry="15" width="280" height="420" />
    </ContentLoader>

);

export default Loading;
