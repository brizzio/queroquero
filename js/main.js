var url = 'https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='
var gsheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS733B5pIbf0pxpqA3E_1uea0_-52ZIdUN7ByKlBK0VtN72wsoEGlKENyABPZmUXUxzx7u4sdjRYzZm/pubhtml'
var produtos
var jsoo

$(document).ready(function(){
    console.log('queroquero ready!!!')

    
        Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1cNfx7SOWPvUviWKJFYQJ80NthtdroLMdcqWXUp3smwk/pubhtml',
                         callback: function(data, tabletop) { 
                             console.log(data)
                             produtos = data
                             jsoo = JSON.stringify(data)
                         },
                         simpleSheet: true } )
     


    $('#searchForm').on('submit',function(e){
        let searchText = ($('#searchText').val());
        getProducts(searchText);
        

        e.preventDefault();
    });

    $('#searchText').on('keyup', function(e){
        var html_div=''
        console.log(e.target.value);
        var filtered = (function(pattern){
            var filtered = [], i = produtos.length, re = new RegExp('^.*'+ pattern + '.*$','i');
           

            console.log(re)
            while (i--) {
                if (re.test(produtos[i].item)) {
                    filtered.push(produtos[i]);
                    html_div+=  `	
                    <div class="col-md-3">
                        <div class = "well text-center">
                             <h5>` + produtos[i].item + `</h5>
                            
                        </div>
                    </div>
                `
                }
            }
            //return filtered;
            console.log('htmldiv: ' + html_div)
            console.log(filtered)
            $('#produtos').html(html_div);
           
        })(e.target.value); // A is the patt
    });

});



function getProducts(txt){
    axios.get(url + txt)
        .then((response)=>{
            console.log(response);
            let produtos = response.data.results;
            console.log(produtos);
            let output = ''
            $.each(produtos, (index, produto)=>{
                    `	
                    <div class="col-md-3">
                        <div class = "well text-center">
                             <h5>$(produto.title)</h5>
                            
                        </div>
                    </div>
                `
            });
            console.log(output)
            $('produtos').html(output);
        })
        .catch((err)=>{
            console.log(err);
        })
}



/* 
You can use jQuery.grep() since jQuery 1.0:

$.grep(homes, function (h) {
  return h.price <= 1000
    && h.sqft >= 500
    && h.num_of_beds >= 2
    && h.num_of_baths >= 2.5
});

json.HOMES = $.map(json.HOMES, function(val, key) {
    if (Number(val.price) <= 1000
            && Number(val.sqft) >= 500
            && Number(val.num_of_beds) >=2
            && Number(val.num_of_baths ) >= 2.5)
        return val;
});



 */