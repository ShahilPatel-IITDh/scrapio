var layerSliderCustomTransitions={"t2d":[{"name":"Smooth fading from right","rows":1,"cols":35,"tile":{"delay":25,"sequence":"reverse"},"transition":{"duration":750,"easing":"linear","type":"fade","direction":"left","rotateX":0,"rotateY":0,"rotate":0,"scale":1}}],"t3d":[{"name":"Turning cuboid to right (90°)","rows":1,"cols":1,"tile":{"delay":75,"sequence":"forward"},"animation":{"duration":1500,"easing":"easeInOutQuart","direction":"horizontal","transition":{"rotateY":90}}},{"name":"Scaling and horizontal spinning cuboids random (180°, large depth)","rows":[2,4],"cols":[4,7],"tile":{"delay":75,"sequence":"random","depth":"large"},"before":{"duration":700,"easing":"easeInOutQuint","transition":{"scale3d":0.65}},"animation":{"duration":700,"easing":"easeInOutBack","direction":"horizontal","transition":{"rotateY":180}},"after":{"duration":700,"easing":"easeInOutBack"}}]}