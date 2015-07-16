/*
|Shareable Whiteboard
|Burningsoul
*/
angular.module('core',['ui.router'])
       .config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

       	$stateProvider
                .state('/', {
                    url: '/:id',
                    templateUrl: 'template/whiteboard.html',
                    //ontroller: 'WhiteboardCtrl'
                });


         $urlRouterProvider.otherwise('/'+rand_id());


       }])
      

function rand_id(){
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}