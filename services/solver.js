(function(angular) {
    "use strict";

    angular.module("ScrambleSquares", [])
        .directive("duCard", [
            function() {
                return {
                    restrict: "E",
                    templateUrl: "/Content/app/card-template.html",
                    scope: {
                        card: "=",
                        canRotate: "="
                    },
                    controller: function($scope) {
                        if ($scope.canRotate === true) {
                            $scope.rotateCard = function() {
                                var temp = $scope.card.North;
                                $scope.card.North = $scope.card.West;
                                $scope.card.West = $scope.card.South;
                                $scope.card.South = $scope.card.East;
                                $scope.card.East = temp;
                            };
                        }
                    }
                };
            }
        ])
        .directive("duCardEdit", [
            function() {
                return {
                    restrict: "E",
                    templateUrl: "/Content/app/card-edit-template.html",
                    scope: {
                        card: "=",
                        cardOptions: "="
                    }
                };
            }
        ])
        .controller("PuzzleController", [
            "PuzzleSolver", "$timeout",
            function(PuzzleSolver, $timeout) {
                var ctrl = this;

                ctrl.edit = function() {
                    ctrl.isEditing = true;
                };

                ctrl.save = function() {
                    ctrl.isEditing = false;
                };

                ctrl.direction = {
                    Top: 1,
                    Bottom: 0
                };

                ctrl.types = [
                    { Name: "Army", Color: "#ff0000" },
                    { Name: "Navy", Color: "#00ff00" },
                    { Name: "Air Force", Color: "#0000ff" },
                    { Name: "Coast Guard", Color: "#ff00ff" }
                ];

                ctrl.cards = [
                    {
                        CardId: 1,
                        North: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        South: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[0]
                        },
                        East: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[2]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        }
                    },
                    {
                        CardId: 2,
                        North: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        South: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[3]
                        },
                        East: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[0]
                        },
                        West: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[2]
                        }
                    },
                    {
                        CardId: 3,
                        North: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        East: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[0]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[0]
                        }
                    },
                    {
                        CardId: 4,
                        North: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[0]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        East: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[2]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        }
                    },
                    {
                        CardId: 5,
                        North: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        East: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[3]
                        },
                        West: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[2]
                        }
                    },
                    {
                        CardId: 6,
                        North: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[1]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[2]
                        },
                        East: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[0]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[2]
                        }
                    },
                    {
                        CardId: 7,
                        North: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[1]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[0]
                        },
                        East: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[2]
                        },
                        West: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[3]
                        }
                    },
                    {
                        CardId: 8,
                        North: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[0]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[1]
                        },
                        East: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[2]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        }
                    },
                    {
                        CardId: 9,
                        North: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[2]
                        },
                        South: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[3]
                        },
                        East: {
                            Direction: ctrl.direction.Top,
                            Type: ctrl.types[1]
                        },
                        West: {
                            Direction: ctrl.direction.Bottom,
                            Type: ctrl.types[0]
                        }
                    }
                ];

                ctrl.solve = function () {

                    ctrl.solution = null;
                    ctrl.noSolution = false;
                    ctrl.calculating = true;

                    var solution;
                    $timeout(function() {
                        var copy = angular.copy(ctrl.cards);
                        solution = PuzzleSolver.Solve(copy);
                        ctrl.solution = solution;
                        ctrl.noSolution = !solution;
                        ctrl.calculating = false;
                    });
                };
            }
        ])
        .service("PuzzleSolver", [
            function() {

                var rotateRight = function(card, spin) {
                        switch (spin) {
                        case 0:
                            return {
                                CardId: card.CardId,
                                North: card.North,
                                East: card.East,
                                South: card.South,
                                West: card.West
                            };
                        case 1:
                            return {
                                CardId: card.CardId,
                                North: card.West,
                                East: card.North,
                                South: card.East,
                                West: card.South
                            };
                        case 2:
                            return {
                                CardId: card.CardId,
                                North: card.South,
                                East: card.West,
                                South: card.North,
                                West: card.East
                            };
                        case 3:
                            return {
                                CardId: card.CardId,
                                North: card.East,
                                East: card.South,
                                South: card.West,
                                West: card.North
                            };
                        default:
                            throw "Expecting 0-3";
                        }
                    },
                    filterCards = function(cards, idToFilter) {
                        var filtered = [];
                        angular.forEach(cards, function(card) {
                            if (card.CardId !== idToFilter) {
                                filtered.push(angular.copy(card));
                            }
                        });
                        return filtered;
                    },
                    sidesMatch = function(s1, s2) {
                        return angular.equals(s1.Type, s2.Type) && s1.Direction !== s2.Direction;
                    },
                    isValid = function(node) {
                        /*   ___________
                            |_0_|_1_|_2_|
                            |_3_|_4_|_5_|
                            |_6_|_7_|_8_|
                        */
                        var grid = node.CurrentSolution;
                        switch (node.CurrentSolution.length) {
                        case 1:
                            return true;
                        case 2:
                            return sidesMatch(grid[0].East, grid[1].West);
                        case 3:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[1].East, grid[2].West);
                        case 4:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].East, grid[2].West);
                        case 5:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].South, grid[4].North) &&
                                sidesMatch(grid[1].East, grid[2].West) &&
                                sidesMatch(grid[3].East, grid[4].West);
                        case 6:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].South, grid[4].North) &&
                                sidesMatch(grid[1].East, grid[2].West) &&
                                sidesMatch(grid[2].South, grid[5].North) &&
                                sidesMatch(grid[3].East, grid[4].West) &&
                                sidesMatch(grid[4].East, grid[5].West);
                        case 7:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].South, grid[4].North) &&
                                sidesMatch(grid[1].East, grid[2].West) &&
                                sidesMatch(grid[2].South, grid[5].North) &&
                                sidesMatch(grid[3].East, grid[4].West) &&
                                sidesMatch(grid[3].South, grid[6].North) &&
                                sidesMatch(grid[4].East, grid[5].West);
                        case 8:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].South, grid[4].North) &&
                                sidesMatch(grid[1].East, grid[2].West) &&
                                sidesMatch(grid[2].South, grid[5].North) &&
                                sidesMatch(grid[3].East, grid[4].West) &&
                                sidesMatch(grid[3].South, grid[6].North) &&
                                sidesMatch(grid[4].South, grid[7].North) &&
                                sidesMatch(grid[4].East, grid[5].West) &&
                                sidesMatch(grid[6].East, grid[7].West);
                        case 9:
                            return sidesMatch(grid[0].East, grid[1].West) &&
                                sidesMatch(grid[0].South, grid[3].North) &&
                                sidesMatch(grid[1].South, grid[4].North) &&
                                sidesMatch(grid[1].East, grid[2].West) &&
                                sidesMatch(grid[2].South, grid[5].North) &&
                                sidesMatch(grid[3].East, grid[4].West) &&
                                sidesMatch(grid[3].South, grid[6].North) &&
                                sidesMatch(grid[4].South, grid[7].North) &&
                                sidesMatch(grid[4].East, grid[5].West) &&
                                sidesMatch(grid[5].South, grid[8].North) &&
                                sidesMatch(grid[6].East, grid[7].West) &&
                                sidesMatch(grid[7].East, grid[8].West);
                        default:
                            throw "Should not be in the default";
                        }
                    },
                    tryPlace = function(node, card) {
                        node.CurrentSolution.push(card);
                        if (isValid(node)) {
                            return true;
                        }
                        node.CurrentSolution.pop();
                        return false;
                    },
                    solveNode = function(node) {
                        if (node.CurrentSolution.length === 9) {
                            if (isValid(node)) {
                                return node;
                            }
                            return null;
                        }

                        for (var i = 0; i < node.AvailableCards.length; i++) {
                            var available = node.AvailableCards[i];
                            var nodeClone = angular.copy(node);
                            nodeClone.AvailableCards = filterCards(nodeClone.AvailableCards, available.CardId);
                            for (let spin = 0; spin < 4; spin++) {
                                var spun = rotateRight(available, spin);
                                if (tryPlace(nodeClone, spun)) {
                                    var solution = solveNode(nodeClone);
                                    if (solution) {
                                        return solution;
                                    }
                                }
                            }
                        }
                    };

                var solve = function(cards) {
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        for (let spin = 0; spin < 4; spin++) {
                            var spun = rotateRight(card, spin),
                                initial = {
                                    CurrentSolution: [spun],
                                    AvailableCards: filterCards(cards, spun.CardId)
                                },
                                node = solveNode(initial);

                            if (node) {
                                return node.CurrentSolution;
                            }
                        }
                    }
                    return null;
                };

                return {
                    Solve: solve
                };
            }
        ]);

}(window.angular));
