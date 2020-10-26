import styled from "styled-components";
import Layout from "../components/Layout";

const ImageBox = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  .layer {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px 20px;
    font-size: 20px;
    p {
      margin: 0;
    }
  }
`;

export default function Home() {
  return (
    <Layout title="메인">
      <ImageBox style={{ backgroundImage: "url(/images/main.png)" }}>
        <div className="layer">
          <p style={{ fontSize: 40 }}>😀</p>
          <p>클래스 101에 오신 걸 환영합니다!</p>
        </div>
      </ImageBox>
    </Layout>
  );
}
