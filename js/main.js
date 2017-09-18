var url = 'https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='

$(document).ready(function(){
    
    $('#searchForm').on('submit',function(e){
        let searchText = ($('#searchText').val());
        getProducts(searchText);

        e.preventDefault();
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
                
                    <div class="col-md-3">
                        <div class = "well text-center">
                             <h5>$(produto.title)</h5>
                            
                        </div>
                    </div>
                
            });
            console.log(output)
            $('produtos').html(output);
        })
        .catch((err)=>{
            console.log(err);
        })
}