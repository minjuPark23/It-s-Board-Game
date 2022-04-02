import React, { useEffect } from "react";

interface Location {
  long: number;
  lat: number;
  addr: string;
}

export default function Map({ long, lat, addr }: Location) {
  const { kakao } = window;
  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
 // const [myAddress, setMyAddress] = useState("");
 // const [loading, setLoading] = useState(false);

  useEffect(() => {
   // setMyAddress(addr);
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 25,
    };

  //  var locPosition = new kakao.maps.LatLng(lat, long); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    const map = new kakao.maps.Map(container, options); //맵 뿌리기
    // 이동할 위도 경도 위치를 생성합니다
    map.setCenter(new kakao.maps.LatLng(lat, long));

    const ps = new kakao.maps.services.Places(); //키워드 서치용

    // console.log(locPosition);
    ps.keywordSearch(addr + "보드게임", placesSearchCB); //이쪽이 본체였음

    async function placesSearchCB(data: any, status: number) {
      //setMyAddress(addr);
      //  console.log("child: " + addr);
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }

    var imageSrc =
        "https://github.com/Jun0S2/TIL/blob/main/REACT/marker_red.png?raw=true", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(58, 64), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    //마커 뿌리기
    function displayMarker(place: any) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage, // 마커 이미지
      });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="width :100%; margin: 30px;">' +
            '<p style="font-size:14px; font-weight:bold;">' +
            place.place_name +
            "</p>" +
            '<p style="font-size:8px;">' +
            place.road_address_name +
            "</p>" +
            '<p style="font-size:8px;">' +
            place.address_name +
            "</p>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, []);

  return (
    <>
      <div
        id="myMap"
        style={{
          height: "70vh",
        }}
      ></div>
    </>
  );
}
