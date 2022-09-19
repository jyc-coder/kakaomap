import React, { useEffect, useRef, useState } from "react";
import { validateLocaleAndSetLanguage } from "typescript";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
    loadMap: () => void;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<any[]>([]);
  //const map = useState<any>(null);
  const map = useRef<any>(null);

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
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 10,
          };

          map.current = new window.kakao.maps.Map(mapRef.current, options);
          //setMaps(new window.kakao.maps.Map(mapRef.current,options));
          window.kakao.maps.event.addListener(
            map.current,
            "rightclick",
            (mouseEvent: any) => {
              const latlng = mouseEvent.latLng;
              const title = prompt("마커의 타이틀 입력");
              var marker = new window.kakao.maps.Marker({
                map: map.current,
                position: latlng,
                title,
              });
              setMarkerList((prev) => [...prev, marker]);
            }
          );
        }
      });
    };

    return () => script.remove();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(37.5666805, 126.9784147)
          );
          map.current.setLevel(10);
        }}
      >
        서울
      </button>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(35.1379222, 129.05562775)
          );
          map.current.setLevel(5);
        }}
      >
        부산
      </button>
      <input
        type="range"
        min="1"
        max="20"
        onChange={(ev) => {
          map.current.setLevel(ev.currentTarget.value, { animate: true });
        }}
      />
      <button
        onClick={() => {
          map.current.getMapTypeId() === 3
            ? map.current.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP)
            : map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
        }}
      >
        지도 타입 변경
      </button>
      <div
        ref={mapRef}
        style={{
          width: 300,
          height: 300,
        }}
      ></div>
      {markerList.map((value) => (
        <div
          onClick={() => {
            value.setMap(null);
            setMarkerList(markerList.filter((v) => v !== value));
          }}
        >
          {value.getTitle()}
        </div>
      ))}
    </div>
  );
}

export default App;
