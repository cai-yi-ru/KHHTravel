var travel = new Vue({
    el: "#travel",
    data: {
      data: [], //預先定義變數
      Zonedatas:[],
      currentPage: 0,
      locations:[],
      currentLocation:'',
      temAttraction:{},
      totalPage:0,
      
    },
    methods: {
    getAttraction(item){
        // console.log( item)
        const vm = this;
        vm.temAttraction=item;
        
        vm.temherf = "https://www.google.com.tw/maps/place/"+`${item.Add}`
        console.log( vm.temherf)
        $('#productModal').modal('show');



    },
      getUniquePage() {
        //陣列內容不得重複
        const locations = new Set();
        const vm = this;
        vm.data.forEach((item, i) => {
          
          locations.add(item.Zone);
        });
        console.log(locations);
        vm.locations = Array.from(locations);
      },
      
    },
    computed: {
      filterData() {
        const vm = this;
        //先過濾
        let items=[];
        if(vm.currentLocation !==''){
          items = vm.data.filter((item,i)=>{
            return item.Zone == vm.currentLocation
          })
        }else{
          items = vm.data
        }
  
  
        //再分頁
  
        const newData = [];
        console.log(vm.currentLocation )
        items.forEach((item, i) => {
          if (i % 30 === 0) {
            //取餘數
            newData.push([]); //將頁數先訂出來
          }
  
          const page = parseInt(i / 30); //取整數
          newData[page].push(item);
        });
        // newData.length = vm.totalPage;
        vm.totalPage = newData.length;
        // console.log( vm.totalPage)
        return newData;
      },
    },
    created() {
      const vm = this;
      axios
        .get(
          "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c"
        )
        .then(function (response) {
          // handle success接收數據成功
          console.log(response);
          vm.data = response.data.data.XML_Head.Infos.Info;  
          axios
            .get("Zone.json")
            .then(function (response) {  
              vm.Zonedatas = response.data;
  
              vm.data.forEach((item)=>{
                for( Zonedata in vm.Zonedatas){
                  
                  if(item.Zipcode == vm.Zonedatas[Zonedata].Zipcode){
                    // console.log( vm.Zonedatas[Zonedata].Zipcode);
                    item.Zone = vm.Zonedatas[Zonedata].Zone;
                  }
                }
                
                
              })
  
              
              console.log(vm.data);
              vm.getUniquePage();
  
            })
            .catch(function (response) {
              // console.log(response);
            });
            
        })
        .catch(function (error) {
          // handle error接收數據失敗
          console.log(error);
        });
    },
  });
  