/**
* Created by Nicola
* 26/05/2015
*/

angular.module('welc.directives')
    .directive('cityViewScript', function () {
        return {
            link: function link(scope, element, atttr) {
                //All javascript for title page goes here

                //Script to handle parallax
                $(document).ready(function(){
                  var scene = document.getElementById('scene');
                  var parallax = new Parallax(scene, {
                  
                    calibrateX: false,
                    calibrateY: true,
                    invertX: false,
                    invertY: true,
                    limitX: false,
                    limitY: 10,
                    scalarX: 2,
                    scalarY: 8,
                    frictionX: 0.2,
                    frictionY: 0.8,
                    originX: 1,
                    originY: 1
                  });  
                });

            }
        }
    });

