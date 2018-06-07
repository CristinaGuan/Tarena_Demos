angular.module('kaifanla', ['ng', 'ngTouch']).
controller('parentCtrl', function ($scope) {
  //可以被子$scope继承的模型函数
  $scope.jump = function (url, trans) {
    console.log('j....')
    if (!trans) {
      trans = 'slide';
    }
    $.mobile.changePage(url, {transition: trans})
  }
  /*$('#start').on('swipeleft', function () {
    console.log('j....')
    $.mobile.changePage('tpl/main.html', {transition: 'slide' })
  })*/
  //监听新page beforeshow事件(已挂到DOM但尚未显示出来)——使用Angular重新编译新挂载的page
  angular.element('body').on('pagebeforeshow', function (event) {
    var scope = angular.element(event.target).scope();
    angular.element(event.target).injector().
    invoke(function ($compile) {
      $compile(angular.element(event.target))(scope);
      scope.$digest();
    })
  })
}).
controller('startCtrl', function ($scope) {

}).
controller('mainCtrl', function ($scope, $http) {
  $scope.hasMore = true;   //是否还有更多数据可供加载
  //$.mobile.loading('show');
  //page初始化时从服务器端获取数据
  $http.get('../data/dish_listbypage.php').
  success(function (data) {
    $scope.dishList = data;  //把服务器端返回的数据声明为Model
  });

  //“加载更多”按钮的监听函数
  $scope.loadMore = function () {
    $http.get('../data/dish_listbypage.php?start=' + $scope.dishList.length).
    success(function (data) {
      if (data.length < 5) {
        $scope.hasMore = false;
      }
      //if($scope.dishList.length>200){ $scope.dishList.shift(...)}
      $scope.dishList = $scope.dishList.concat(data);
    });
  }

  //监听Model数据kw的改变
  $scope.$watch('kw', function (to, from) {
    if (!to) {
      return;
    }
    $http.get('../data/dish_listbykw.php?kw=' + to).
    success(function (data) {
      $scope.dishList = [];  //服务器返回了查询结果，则清除之前的所有数据
      if (data.length == 0) {
        $scope.hasMore = false;
        return;
      }
      $scope.hasMore = true;
      $scope.dishList = data;  //覆盖之前的数据
    });
  })
}).
controller('detailCtrl', function ($scope, parseSearch, $http) {
  //读取上一个页面传递的did
  //console.log($location);  //不能注入$location服务——它会修改地址栏中的url
  //console.log($.mobile.getDocumentUrl())
  //console.log($.mobile.path.parseLocation())
  //var result = parseSearch(  '?did=3&pno=5&uname=tom'  );
  //console.log(result);
  var did = parseSearch(location.search).did;
  //根据上一个页面提交的菜品编号，查询菜品信息
  $http.get('../data/dish_listbydid.php?did=' + did).
  success(function (data) {
    $scope.dish = data;
  })
}).
controller('orderCtrl', function ($scope,parseSearch) {
  var did = parseSearch(location.search).did;
  console.log('Order-DID:' +did);
}).
controller('myorderCtrl', function ($scope) {

}).
service('parseSearch', function () {
  return function (search) {   //可以在所有的Controller中使用的一个函数——Service
    /*将形如'?did=2&pno=3&uname=tom&loc=bj转换为一个对象'*/
    var result = {};
    search = search.substring(1);
    var arr = search.split('&');  //['did=3', 'pno=5', 'uname=tom']
    angular.forEach(arr, function (v, k) {
      var kv = v.split('=');
      result[kv[0]] = kv[1];
    })
    return result;
  }
})