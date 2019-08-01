$(function() {
  class Question {
    constructor(title, choices, ancer) {
      Object.assign(this, { title, choices, ancer });
    }
    changeIndex(callback) {
      let index = 0;
      var Qindex = "";
      switch (index) {
        case 1:
          var Qindex = q2;
          break;
        case 2:
          var Qindex = q3;
          $("#next").text("Show Score");
          break;
        default:
          var Qindex = q1;
          break;
      }
      callback();
    }
    changeQ() {
      Qindex.changeIndex(function() {
        let index = 0;
        var Qindex = "q1";
        $("#q_title").html(Qindex.title);
        Shuffle();
        for (let i = 0; i < Qindex.choices.length; i++) {
          $("#question").append(
            ` <button class="btn q"> ${Qindex.choices[i]} </button>`
          );
        }
      });
    }
    clickchoose() {
      Qindex.changeIndex(function() {
        let index = 0;
        var Qindex = "";
        $("#next").addClass("choose");
        var chooseNumber = $(event.target).text();
        $(".q").removeClass("q");
        console.log(chooseNumber);
        console.log(Qindex.ancer);
        if (chooseNumber == Qindex.ancer) {
          $(event.target).addClass("ok");
        } else {
          $(event.target).addClass("ng");
        }
      });
    }
    next() {
      $("#question").empty();
      Qindex.changeQ();
      console.log(Qindex);
      index++;
    }
  }
  let q1 = new Question(
    "世界一の海は？",
    ["カスピ海", "琵琶湖", "海"],
    "カスピ海"
  );
  let q2 = new Question("10×３は？", ["5", "4", "30"], "30");
  let q3 = new Question("今何問目？", ["3問目", "4問目", "5問目"], "3問目");
  var Qindex = "";
  function Shuffle() {
    var a = Qindex.choices;
    for (i = a.length - 1; i > 0; i--) {
      r = Math.floor(Math.random() * (i + 1));
      tmp = a[i];
      a[i] = a[r];
      a[r] = tmp;
    }
  }
var Qindex = "q1";
  $(document).on("click", ".choose", function() {
    Qindex.next();
    $(this).removeClass("choose");
  });
  $(document).on("click", ".q", function() {
    Qindex.clickchoose();
  });
  q1.changeQ();
});
