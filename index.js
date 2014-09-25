'use strict';

function distance( pt1, pt2 ){
  var deltaX = pt1.x - pt2.x;
  var deltaY = pt1.y - pt2.y;
  return Math.sqrt( deltaX * deltaX + deltaY * deltaY );
}

function interpolateLineRange( ctrlPoints, number ){
  var totalDist = 0;
  var ctrlPtDists = [ 0 ];
  for( var pt = 1; pt < ctrlPoints.length; pt++ ){
    totalDist += distance( ctrlPoints[ pt ], ctrlPoints[ pt - 1 ] );
    ctrlPtDists.push( totalDist );
  }

  var step = totalDist / number;
  var interpPoints = [ ctrlPoints[ 0 ] ];
  var prevCtrlPtInd = 0;
  var currDist = 0;
  var currPoint = ctrlPoints[ 0 ];
  var nextDist = step;

  for( pt = 0; pt < number - 1; pt++ ){
    while( nextDist > ctrlPtDists[ prevCtrlPtInd + 1 ] ){
      prevCtrlPtInd++;
      currDist = ctrlPtDists[ prevCtrlPtInd ];
      currPoint = ctrlPoints[ prevCtrlPtInd ];
    }

    var remainingDist = nextDist - currDist;
    var ctrlPtsDeltaX = ctrlPoints[ prevCtrlPtInd + 1 ].x -
      ctrlPoints[ prevCtrlPtInd ].x;
    var ctrlPtsDeltaY = ctrlPoints[ prevCtrlPtInd + 1 ].y -
      ctrlPoints[ prevCtrlPtInd ].y;
    var ctrlPtsDist = ctrlPtDists[ prevCtrlPtInd + 1 ] -
      ctrlPtDists[ prevCtrlPtInd ];

    currPoint = {
      x: currPoint.x + ( ctrlPtsDeltaX / ctrlPtsDist ) * remainingDist,
      y: currPoint.y + ( ctrlPtsDeltaY / ctrlPtsDist ) * remainingDist
    };
    interpPoints.push( currPoint );

    currDist = nextDist;
    nextDist += step;
  }

  interpPoints.push( ctrlPoints[ ctrlPoints.length - 1 ] );
  return interpPoints;
}

function Point( x, y ){
  this.x = x;
  this.y = y;
}