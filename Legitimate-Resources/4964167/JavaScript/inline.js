
						window.addEventListener('DOMContentLoaded', () => {
							var mobileDetect = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
								crestaContainer = document.querySelector('.cresta-whatsapp-chat-container'),
								crestaBox = document.querySelector('.cresta-whatsapp-chat-box'),
								crestaOverlay = document.querySelector('.cresta-whatsapp-chat-overlay');
							if (mobileDetect) {
								crestaContainer.style.display = 'none';
								crestaBox.addEventListener('click', () => {
									window.location = 'whatsapp://send?text=&phone=56989034719&abid=56989034719';
								})
							} else {
								if (crestaOverlay) {
									[crestaBox, crestaOverlay].forEach(item => {
										item.addEventListener('click', () => {
											if(crestaBox.classList.contains('open')) {
												crestaBox.classList.remove('open');
												crestaContainer.classList.remove('open');
												crestaOverlay?.classList.remove('open');
											} else {
												crestaBox.classList.add('open');
												crestaContainer.classList.add('open');
												crestaOverlay?.classList.add('open');
												setTimeout (function () {
													document.querySelector('.cresta-whatsapp-chat-container .cresta-whatsapp-inner textarea.cresta-whatsapp-textarea').focus();
												}, 100);
											}
										})
									})
								} else {
									crestaBox.addEventListener('click', () => {
										if(crestaBox.classList.contains('open')) {
											crestaBox.classList.remove('open');
											crestaContainer.classList.remove('open');
										} else {
											crestaBox.classList.add('open');
											crestaContainer.classList.add('open');
											setTimeout (function () {
												document.querySelector('.cresta-whatsapp-chat-container .cresta-whatsapp-inner textarea.cresta-whatsapp-textarea').focus();
											}, 100);
										}
									})
								}
								document.querySelector('.cresta-whatsapp-chat-container .cresta-whatsapp-send').addEventListener('click', () => {
									var baseUrl = 'https://web.whatsapp.com/send?phone=56989034719&text=',
										textEncode = encodeURIComponent(document.querySelector('.cresta-whatsapp-chat-container .cresta-whatsapp-textarea').value);
									window.open(baseUrl + textEncode, '_blank');
								})
							}
						})
					