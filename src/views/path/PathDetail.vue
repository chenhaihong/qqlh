<template>
  <div class="PathDetail">
    <section class="box">
      <h1 class="title">行程详情：</h1>
      <div class="content">
        <el-row>
          <el-col :span="6">
            <div class="name">开始时间：</div>
            <p class="value">2017-2-7 15:45</p>
          </el-col>
          <el-col :span="6">
            <div class="name">用户昵称：</div>
            <p class="value">AB36789</p>
          </el-col>
          <el-col :span="6">
            <div class="name">行程ID：</div>
            <p class="value">{{ $route.params.id }}</p>
          </el-col>
          <el-col :span="6">
            <div class="name">奖励金额：</div>
            <p class="value">122元</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="name">结束时间：</div>
            <p class="value">2017-2-7 17:45</p>
          </el-col>
          <el-col :span="6">
            <div class="name">车牌号：</div>
            <p class="value">粤AB3689</p>
          </el-col>
          <el-col :span="6">
            <div class="name">里程：</div>
            <p class="value">100公里</p>
          </el-col>
          <el-col :span="6">
            <div class="name">优惠方式：</div>
            <p class="value">无</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="name">用时时长：</div>
            <p class="value">01:59:04</p>
          </el-col>
          <el-col :span="6">
            <div class="name">行程路段：</div>
            <p class="value">机场-太和</p>
          </el-col>
          <el-col :span="6">
            <div class="name">涉及路费：</div>
            <p class="value">50元</p>
          </el-col>
          <el-col :span="6">
            <div class="name">奖励点：</div>
            <p class="value">{{2}} / {{10}}</p>
          </el-col>
        </el-row>
      </div>
    </section>

    <div style="margin-bottom: 20px;"></div>

    <section class="box">
      <h1 class="title">行程轨迹</h1>
      <div class="content">
        <div id="map">
          <div id="mapContainer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const AMap = window.AMap;
export default {
  name: "PathDetail",
  data: () => ({
    name: "2017-2-7 15:45",
    startTime: "2017-2-7 17:45",
    endTime: "",
    lnglats: []
  }),
  props: [],
  components: {},
  computed: {
    desc() {
      return `
                开始时间：${this.startTime}<br>
                结束时间：${this.endTime}<br>
                奖励金额：122元<br>
                里程：100公里
            `;
    },
    center() {
      let lngX = 0,
        latX = 0;
      for (let i = 0; i < this.lnglats.length; i++) {
        lngX += this.lnglats[i].lng;
        latX += this.lnglats[i].lat;
      }

      let lng = lngX / this.lnglats.length || 113.397715;
      let lat = latX / this.lnglats.length || 23.144317;

      return { lng, lat };
    }
  },
  methods: {},
  watch: {},
  created() {},
  mounted() {
    let map = null,
      level = 11,
      // center = this.center,
      infoWindow = null,
      features = [
        {
          type: "Polyline",
          name: "行程id",
          desc: this.desc,
          strokeWeight: 6,
          strokeColor: "#F0202F",
          strokeOpacity: 0.8,
          lnglat: []
        }
      ];

    let mapFeatureClick = e => {
      if (!infoWindow) {
        infoWindow = new AMap.InfoWindow({ autoMove: true });
      }
      let extData = e.target.getExtData();
      infoWindow.setContent(
        `<h5>${extData.name}</h5><div>${extData.desc}</div>`
      );
      infoWindow.open(map, e.lnglat);
    };

    let loadFeatures = () => {
      for (
        let feature, data, i = 0, len = features.length, j, jl, path;
        i < len;
        i++
      ) {
        data = features[i];
        switch (data.type) {
          case "Marker":
            feature = new AMap.Marker({
              map: map,
              position: new AMap.LngLat(data.lnglat.lng, data.lnglat.lat),
              zIndex: 3,
              extData: data,
              offset: new AMap.Pixel(data.offset.x, data.offset.y),
              title: data.name,
              content:
                '<div class="icon icon-' +
                data.icon +
                " icon-" +
                data.icon +
                "-" +
                data.color +
                '"></div>'
            });
            break;
          case "Polyline":
            for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
              path.push(
                new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat)
              );
            }
            feature = new AMap.Polyline({
              map: map,
              path: path,
              extData: data,
              zIndex: 2,
              strokeWeight: data.strokeWeight,
              strokeColor: data.strokeColor,
              strokeOpacity: data.strokeOpacity
            });
            break;
          case "Polygon":
            for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
              path.push(
                new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat)
              );
            }
            feature = new AMap.Polygon({
              map: map,
              path: path,
              extData: data,
              zIndex: 1,
              strokeWeight: data.strokeWeight,
              strokeColor: data.strokeColor,
              strokeOpacity: data.strokeOpacity,
              fillColor: data.fillColor,
              fillOpacity: data.fillOpacity
            });
            break;
          default:
            feature = null;
        }
        if (feature) {
          AMap.event.addListener(feature, "click", mapFeatureClick);
        }
      }
    };

    map = new AMap.Map("mapContainer", {
      //center: new AMap.LngLat(center.lng, center.lat),
      level: level,
      keyboardEnable: false,
      dragEnable: false,
      scrollWheel: false,
      doubleClickZoom: false
    });

    map.on("complete", function() {
      map.plugin(["AMap.Scale"], function() {
        map.addControl(new AMap.Scale());
      });
    });

    let lnglats = [
      { lng: 113.532298, lat: 23.119691 },
      { lng: 113.504489, lat: 23.114639 },
      { lng: 113.496935, lat: 23.114323 },
      { lng: 113.488696, lat: 23.114955 },
      { lng: 113.474963, lat: 23.114008 },
      { lng: 113.447154, lat: 23.120007 },
      { lng: 113.416941, lat: 23.128216 },
      { lng: 113.365443, lat: 23.142739 },
      { lng: 113.358233, lat: 23.145264 },
      { lng: 113.344157, lat: 23.144949 },
      { lng: 113.321154, lat: 23.154419 },
      { lng: 113.325274, lat: 23.158838 },
      { lng: 113.330424, lat: 23.161679 },
      { lng: 113.33317, lat: 23.163573 },
      { lng: 113.328021, lat: 23.16673 },
      { lng: 113.325961, lat: 23.16957 },
      { lng: 113.330767, lat: 23.174936 },
      { lng: 113.332827, lat: 23.17967 },
      { lng: 113.335917, lat: 23.184089 },
      { lng: 113.33935, lat: 23.191032 }
    ];

    let id = setInterval(() => {
      if (lnglats.length) {
        features[0].lnglat.push(lnglats.shift());

        loadFeatures();
      } else {
        clearInterval(id);
      }
    }, 80);
  }
};
</script>

<style lang="less" scoped>
.PathDetail {
  padding: 20px;

  .box {
    padding-bottom: 1px;
    background: white;

    .title {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      text-indent: 20px;
      border-bottom: 1px solid #dddddd;
    }

    .content {
      margin: 20px;

      .name {
        float: left;
        width: 80px;
        line-height: 40px;
        text-align: right;
        font-weight: bold;
      }

      .value {
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #map {
        display: block;
        width: 100%;
        height: 450px;
        background: #fcf9f2;
      }

      .amap-container {
        height: 100%;
      }
    }
  }
}
</style>