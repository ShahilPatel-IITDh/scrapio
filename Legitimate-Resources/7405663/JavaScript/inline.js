
								var delay = parseInt('2');
								var next = 'https://fairsavings.in/shop/view/25?utm_source=direct&utm_medium=adm&utm_campaign=fairsavings&utm_content=myntra&w=2110507&c=24818&r=3&d=1&g=IN&x=669bfdc410d5efbfb59a5d2e54f65cdc&y=27fbf7132e8c2a10e069b1ba0363b7b7';
								var delayNode = document.getElementById('delay');
								setInterval(function(){
										delay = delay - 1;
										if (delay === 0) {
												window.location.replace(next);
										} else {
												if (delay >= 0) {
													delayNode.innerText = delay;
												}
										}
								}, 1000);
						