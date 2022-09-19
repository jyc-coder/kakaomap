import React, { useEffect, useRef } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
    loadMap: () => void;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //#1 index.html에 script를 작성(api키와 세부내용 모두 작성)하고 불러오기
    //window.loadMap()

    //#2 index.html에 script를 작성(api키만 작성하고 세부내용을 작성함)
    /*  const container = document.getElementById("map");
    var options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    var map = new window.kakao.maps.Map(container, options); */

    //#3 Id를 사용하는 대신에 useRef를 사용하여 Element를 선택함
    /*   if (mapRef.current) {
      var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      var map = new window.kakao.maps.Map(mapRef.current, options);

      console.log(mapRef.current);
    } */

    //#4 useEffect에 api키와 세부내용을 모두 작성(권장)
    const script = document.createElement("script");

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=beef395ac58f9ef890b8b34d251e5fa0&autoload=false";

    document.head.appendChild(script);

    script.onload = () => {
      console.log("hello");
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          var map = new window.kakao.maps.Map(mapRef.current, options);

          console.log(mapRef.current);
        }
      });
    };

    return () => script.remove();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: 300,
        height: 300,
      }}
    >
      뭐요
    </div>
  );
}

export default App;
