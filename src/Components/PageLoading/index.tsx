import ContentLoader from "react-content-loader";
import styled from "styled-components";

const Item = styled.div`
    max-width: 270px;
    width: 100%;
    height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border: 1px solid #d0d0d0;
    border-radius: 15px;
`;

const Loading = () => (
    <Item>
        <ContentLoader
            speed={3}
            width={270}
            height={420}
            viewBox="0 0 270 420"
            backgroundColor="#ffffff"
            foregroundColor="#f6f6f6"
        >
            <rect x="0" y="0" rx="15" ry="15" width="280" height="420" />
        </ContentLoader>
    </Item>
);

export default Loading;
