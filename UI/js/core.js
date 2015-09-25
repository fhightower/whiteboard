/*
|Shareable Whiteboard
|Burningsoul
*/
angular.module('Whiteboard',['ui.router'])
       .config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

        $stateProvider
                .state('/', {
                    url: '/:id',
                    templateUrl: 'template/whiteboard.html',
                    controller: 'whiteboardCtrl'
                });
         $urlRouterProvider.otherwise('/'+rand_id());
       }])
      

function rand_id(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function hideinfo(){
  $(".info-bg").hide();
}