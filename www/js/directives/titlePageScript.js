/**
 * Created by John on 25/05/2015.
 */
angular.module('welc.directives')
    .directive('titlePageScript', function () {
        return {
            link: function link(scope, element, atttr) {
                //All javascript for title page goes here

                $(document).ready(function() {
                   $('.darkClass').each(function(fadeInDiv){
                     $(this).delay(12000).fadeIn(200);
                   });
                });
            }
        }
    });
