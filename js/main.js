// 追加ボタンクリック時の関数
const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';

  //未完了リストに追加
  creatIncompleteTodo(inputText);
};

// 渡された引数を基に未完了のTODOを作成する関数
const creatIncompleteTodo = (todo) => {
  // li生成
  const li = document.createElement('li');
  // console.log(li);

  // div生成
  const div = document.createElement('div');
  div.className = 'list-row'; //クラス名を付与
  // console.log(div);

  // p生成
  const p = document.createElement('p');
  p.className = 'todo-item';
  p.innerText = todo; //pタグ内のテキストをtodoに変更
  // console.log(p);

  // button(完了)タグ生成
  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  // console.log(completeButton);
  // ボタンのクリックイベント追加
  completeButton.addEventListener('click', () => {
    // 押された削除ボタンの親にあるliタグ配下の完了ボタンと削除ボタンを削除
    const moveTarget = completeButton.closest('li');
    // completeButtonの次の要素を取得(nextElementSibling)して削除
    completeButton.nextElementSibling.remove();
    completeButton.remove(); //完了ボタンを削除
    // 戻すボタンを生成してdivタグ配下に設定
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    backButton.addEventListener('click', () => {
      // TODOの内容を取得し、未完了リストに追加
      // backButtonの前の要素を取得(previousElementSibling)し、取得した要素のテキストを参照
      const todoText = backButton.previousElementSibling.innerText;
      creatIncompleteTodo(todoText); //関数化したものを呼び出し
      // 押された戻すボタンの親にあるliタグを削除
      backButton.closest("li").remove();
    });
    // firstElementChild=moveTargetの子要素の中の最初の要素にアクセス
    moveTarget.firstElementChild.appendChild(backButton); //appendChildで戻すボタンを追加
    //完了リストに移動
    document.getElementById('complete-list').appendChild(moveTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';
  // console.log(deleteButton);
  deleteButton.addEventListener('click', () => {
    //deleteButtonの親タグを探して最初に見つかる(closestメソッド)liを削除
    const deleteTarget = deleteButton.closest('li');
    // console.log(deleteTarget);
    // incomplete-listの子要素からdeleteTargetを削除
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  // appendChildメソッド liタグの子要素に各要素を設定
  div.appendChild(p); //divタグ配下にpタグ
  div.appendChild(completeButton); //divタグ配下にcompleteButtonタグ
  div.appendChild(deleteButton); //divタグ配下にdeleteButtonタグ
  li.appendChild(div); //liタグ配下にdivタグ
  // console.log(li);

  // 未完了リストに追加
  document.getElementById('incomplete-list').appendChild(li);
};

document.getElementById('add-button').addEventListener('click', onClickAdd);
