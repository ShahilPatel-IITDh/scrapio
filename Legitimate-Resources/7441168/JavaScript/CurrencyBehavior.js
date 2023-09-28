/**
	 * @copyright     D Loja Virtual
	 * @link          http://www.dlojavirtual.com
	 * @package       app.FrontEnd.Js
	 * @since         v 1.0
	 * @author        Bruno Lehnen SimÃµes
**/

CurrencyBehavior = (function(){
	var currencies = {
		'CatalogoCarrinho' : ['valor_frete','valor_total', 'valor_minimo','valor_total_produtos','total_presente','total_carrinho', 'total_carrinho_produtos', 'total_produto', 'desconto', 'desconto_avista', 'adicional'],
		'CatalogoProduto': ['valor_inicio', 'valor_fim'],
		'CatalogoCarrinhoProduto' : ['valor_total','valor_unitario'],
		'Payment': ['valor_parcela', 'parcela_minima', 'valor_avista', 'taxa_juros', 'taxa_desconto'],
		'Shipping': ['Valor']
	};

	function toCurrency(field){					

		if(typeof field !== 'undefined'){
			field = (field !== null) ? field.toString() : '0';
			return accounting.formatMoney(field);
		}

		return false;
	};

	function formatMatches(data, name){
		if(typeof data !== 'undefined'){
			$.each(currencies[name], function(fieldIndex, field){
				data[field] = toCurrency(data[field]);
			});
		}
	};

	function formatShipping(data){
		$.each(data, function(index, value){
			if(value !== null){
				if(typeof value.Valor !== 'undefined'){
					formatMatches(value, 'Shipping');
				}else{
					$.each(value, function(index, val){
						formatMatches(val, 'Shipping');
					});
				}
			}
		});
	}

	function formatCart(data){
		if(data.CatalogoCarrinho){
			formatMatches(data.CatalogoCarrinho, 'CatalogoCarrinho');
		}

		if(data.CatalogoCarrinhoProduto){
			var prodLen = data.CatalogoCarrinhoProduto.length;
			
			if($.isArray(data.CatalogoCarrinhoProduto)){
				for(var i = 0; i < prodLen; i++){
					formatMatches(data.CatalogoCarrinhoProduto[i].CatalogoCarrinhoProduto, 'CatalogoCarrinhoProduto');
				}
			}
			else{
				formatMatches(data.CatalogoCarrinhoProduto, 'CatalogoCarrinhoProduto');
			}
		}
	};

	function formatProduct(data){
		var main = data.CatalogoProduto;
		
		if(main){
			$.each(main, function(index, prod){
				formatMatches(data.CatalogoProduto[index].CatalogoProduto, 'CatalogoProduto');
			});
		}
	};


	function formatPayment(data){
		var rec = function(index, value){
			if(value && !$.isArray(value)){
				formatMatches(value, 'Payment');

				$.each(value, function(fieldName, val){
					if($.isArray(val)){
						var valLen = val.length;

						for(var i = 0; i < valLen; i++){
							formatMatches(value[fieldName][i], 'Payment');
						}

					}
				});


			}else if($.isArray(value)){
				$.each(value, function(index, val){
					rec(index, val);
					value[index] = val;
				}); 
			}
		};

		$.each(data, function(index, value){ rec(index, value); });
	};

	return {
		formatCart: formatCart,
		formatPayment: formatPayment,
		formatProduct: formatProduct,
		formatShipping: formatShipping
	}
	
})();