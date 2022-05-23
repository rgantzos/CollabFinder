async function getAll(username, type) {
  try {
    var response2 = await fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`)
    var data2 = await response2.json()
    var myFollowers = data2['statistics']['followers']
    var possibleMatches = []
    var type = type

    var points = new Array(100);
    for (var i = 0; i < 100; i++) {
      points[i] = i; //This populates the array.  +1 is necessary because arrays are 0 index based and you want to store 1-100 in it, NOT 0-99.
    }
    points.forEach(async function(el) {
      var response = await fetch(`https://scratchdb.lefty.one/v3/user/rank/global/followers/${el}`)
      var data = await response.json()
      Object.keys(data).forEach(function(el) {
        if (data[el]['username'].toLowerCase() !== username.toLowerCase()) {
          if (data[el]['statistics']['followers'] > myFollowers - (myFollowers / 5)) {
            if (data[el]['statistics']['followers'] < myFollowers + (myFollowers / 5)) {
              if (data[el]['bio'] !== null) {
                if (data[el]['bio'].toLowerCase().includes(type.toLowerCase())) {
                  console.log(data[el]['username'])
                  possibleMatches.push(data[el]['username'])
                  var div = document.createElement('div')
                  var a = document.createElement('a')
                  a.href = `https://scratch.mit.edu/users/${data[el]['username']}/`
                  document.querySelector('center').appendChild(a)
                  var h1 = document.createElement('h1')
                  h1.textContent = data[el]['username']
                  var img = document.createElement('img')
                  img.src = `https://cdn2.scratch.mit.edu/get_image/user/${data[el]['id']}_90x90.png?v=`
                  div.appendChild(img)
                  div.appendChild(h1)
                  a.appendChild(div)
                  a.target = '_blank'
                }
              }
            }
          }
        }
      })
    })
  }
  catch (err) {
    var a = document.createElement('h2')
    a.textContent = err
    document.body.appendChild(a)
  }
}

function submit() {
  var username = document.querySelector('input').value
  var type = document.querySelector('select').value
  document.querySelector('input').remove()
  document.querySelector('select').remove()
  document.querySelector('button').remove()
  getAll(username, type)
}
