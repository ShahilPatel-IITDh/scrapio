(() => {
  const PLAID_LOGO = String.raw`
  _____       __          ______      ______      _____
 /\  _  \    /\ \        /\  _  \    /\__  _\    /\  _  \
 \ \ \L\ \   \ \ \       \ \ \L\ \   \/_/\ \/    \ \ \/\ \
  \ \ ,__/    \ \ \  __   \ \  __ \     \ \ \     \ \ \ \ \
   \ \ \/      \ \ \L\ \   \ \ \/\ \     \_\ \__   \ \ \_\ \
    \ \_\       \ \____/    \ \_\ \_\    /\_____\   \ \____/
     \/_/        \/___/      \/_/\/_/    \/_____/    \/___/
`;

  const COPY = `
${PLAID_LOGO}
Hi there!
We're looking for talented individuals who want to build great products
that impact the financial lives of millions. Interested? We're hiring!
https://plaid.com/careers
`;

  setTimeout(() => {
    console.log(COPY);
  }, 1000);
})();
