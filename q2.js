$(function() {
  let count = 0;
  let questions = [
    {
      title: "世界一の海は？",
      choice: ["カスピ海", "琵琶湖", "カリブ海"],
      ancer: "カスピ海"
    },
    {
      title: "10×3は？",
      choice: ["5", "4", "30"],
      ancer: "30"
    },
    {
      title: "今何問目？",
      choice: ["3問目", "4問目", "5問目"],
      ancer: "3問目"
    }
  ];
  let correctNumber = 0;
  let maxNumber = questions.length;

  //クイズに関するDOM操作関数
  function quiz(params) {
    $("#q_title").html(questions[count].title); // タイトルを表示
    Shuffle(); // シャッフル呼び出し
    // 問題文のボタンを配列choiceの分だけ繰り替えし表示
    for (let i = 0; i < questions[count].choice.length; i++) {
      $("#question").append(
        ` <button class="btn q"> ${questions[count].choice[i]} </button>`
      );
    }
    count++;
  }
  // 1問目を表示するために呼び出し
  quiz();

  // シャッフル
  function Shuffle() {
    var a = questions[count].choice;
    for (i = a.length - 1; i > 0; i--) {
      r = Math.floor(Math.random() * (i + 1));
      tmp = a[i];
      a[i] = a[r];
      a[r] = tmp;
    }
  }
  // Questions Click
  $(document).on("click", ".q", function() {
    var select = $(this).text().trim(); 
    $("#next").addClass("choose");// 色が変わり、次の問題を呼び出すためのクラスを付与
    // 答え合わせ
    if (select == questions[count - 1].ancer) {
      $(this).addClass("ok");
      $(this).text(select + "　...correct!");
      correctNumber++;
    } else {
      $(this).addClass("ng");
      $(this).text(select + "　...wrong!");
    }
    $(".q").removeClass("q");
    $("#correctNumber").text(correctNumber);
  });

  // Next Click
  $(document).on("click", "#next.choose", function() {
    if (!$("#next.result").hasClass("result")) {
      $("#question").empty();
      $(this).removeClass("choose");
      quiz();
    }
    // 問題数と現在のcountが同じになったらボタンが切り替わり、選択肢ボタンを無効化
    if (count == maxNumber) {
      $(this).removeClass("choose");
      $(this).addClass("result");
      $(this).text("Show score");
    }
  });

  $("#maxNumber").text(maxNumber);
  $("#replay").on("click", function() {
    location.reload();
  });
  // resultをクリックで、結果を表示
  $(document).on("click", "#next.result", function() {
    $("#result_box").addClass("fadeIn");
  });
});
