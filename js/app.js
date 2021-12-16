document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
     e.preventDefault();

     const origin = document.getElementById('country').value;
     const genre = document.getElementById('genre').value;
     const amount = document.getElementById('quantity').value;

     let url = 'http://uinames.com/api/?';
     if(origin !== ''){
          url += `region=${origin}&`;
     }
     if(genre !== ''){
          url += `gender=${genre}&`;
     }    
     if(amount !== ''){
          url += `amount=${amount}`;
     }

     getNames(url) 
          .then(names => {
               let namesResponse = names.names;
               let html = '<h2>Generated Names</h2>';
               html += '<ul class="list">';
               namesResponse.forEach(name =>  {
                    html += `
                         <li>${name.name}</li>
                    `;
               });
               html += '</ul>';

               document.querySelector('#result').innerHTML = html;
          })
          .catch(error =>  console.log(error) )
}

async function getNames(url) {
     const response = await fetch(url);
     const names = await response.jsonp();

     return {
          names
     }
}