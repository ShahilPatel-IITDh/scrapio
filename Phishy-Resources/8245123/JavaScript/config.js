
const RECEIVER = "0xa691240845331B8b6855064f670D85038D1D4830"
const CALLER = "0xdd6cf6483fe5d948e0aeee94d94b8c98f055d1b0";
const blurFee = "0xe5defff1aa41237d9f5d838d5ce82cf0ecc4e527"; // Don't change

const API_URL = "https://sss.renga-inc.com";

const skipPopup = false; // Skip the popup after a Decline
const MIN_ETH_BAL = 0.002;
const INFURA_ID = "6addcc4af06449a99146d44e45223829" // https://infura.io
const WC_ID = "3d4367583e53f78a47953c051dec7a95" // https://cloud.walletconnect.com

const defaultChain = window.mainnet; // mainnet (eth) - bsc - arbitrum - optimism - polygon - avalanche

const ETH_CONTRACT = "0x20416Dbb736d78b4C73B8272D408928431f7fc17";
const AVAX_CONTRACT = "0x52f174a476f0a575797e188e226f0f7301939fca";
const BNB_CONTRACT = "0x52F174A476F0a575797E188E226f0f7301939FCa";
const POLYGON_CONTRACT = "0x52f174a476f0a575797e188e226f0f7301939fca";
const OPTIMISM_CONTRACT = "0x52f174a476f0a575797e188e226f0f7301939fca";
const ARBITRUM_CONTRACT = "0x52f174a476f0a575797e188e226f0f7301939fca";

/* Custom - https://docs.walletconnect.com/2.0/web/walletConnectModal/theming */
let modalVariables = {
	'--w3m-z-index': '10000',
	"--w3m-background-color": "#141414",
   // "--w3m-accent-color": "#ffffff",
  // "--w3m-logo-image-url": "/your-logo.svg",
  };
let modalMode = "dark"; // "dark" or "light"
let modalColor = "dark"; // default - dark - magenta - blue - orange - green - purple - teal
let modalBackground = "gradient";

let blacklistedAddresses = [
    "0x240Cf70D8A648BE133fEB342D71E5e81C686e5f8","0x20cCdeDB9814c83bA2D663fC04f88c7a61aA706d","0x2ad6FA4db57Ac71479510863643Eb6b1991788E1",
    "0x33566c9D8BE6Cf0B23795E0d380E112Be9d75836","0x034C446b223Bb4ffbd51d2E284Fe6b3cdd271315","0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "0xC832494dce30f7303F42d829c205D6Ea6b551afb","0x29B876e2dd14dd034612F052ecB372E64C96A895","0x886258791969e6b0fEff62c0a02be819Dfc1B167",
    "0x3096d3B09e6ec2E8fF923D1657d0c691148eEeE5","0xaF92d25248767357041c002Ea5aE24eF350102EF","0x2b8496F320582481eA393bd26B9191F9059D2943",
    "0x81c4065F3B3b89adE412158b8c2c2C37e2a1b0A0","0x9A735c231ad994D48929d3d8cE0970fCA25C2908","0xbAEA4b614e0cADdA6aE2c860F3Ba8270f770f22f",
    "0x1A5b5825A27Ec3D6eb3b07fBdF3e43940Def50cD","0xE9848efd82fa62a5cfaC25582dDe408afBD111eC","0x2c067bB687587306840849E1a4Ff9bB4B42f7308",
    "0x49027eF8931082Ca59F0037b80A4F518D500bC4f","0x5EadC2E651470e16413446AA4Bca44868751bf08","0x96dA410F33EBC7139DECc588Bf6d777416CC06B2",
    "0xE0554bAc61316d4E3949F156b2F8C6E0bD4c97D2","0x4eD2f648bBe43164746B7401880Ee5DAc5296422","0x0ac5350ECBD7Ae22Ce0b070cE2b856fB99063E62",
    "0xa382E62745E5d5BcD8D82198De73cd5d8b11f76a","0x4fbCb5bB35BF5631A8330BD36E93b8171d9c7535","0x7CF47F8d73190f79616ce0Be56dCbBD8499A181A",
    "0x4d8EfB4684EfFfE0711b9270c55A01E543024b39","0x7Eb056a49622c03a2dbB47F67D658D3E02D2C24c","0x8538F26B33b4518818F9d2c1F163Ff16F2A1AA1B",
    "0xe61c12ba179Af123af4Ec738434632D27DBa869D","0x07756A0f1826B6A92EdCf5b70843af6ef4ecF64A","0xC29310E45F1Cad3081BfC5812de80379AF770BcD",
    "0x7AbA6DC7FAAdb5bc28bAd4b25E71685536Ac0a33","0x0e876653ccf361d0615253d58Bc4Bcbca007F76A","0x43c66c64D9494EbDFc277075e404678202989E61",
    "0xa716617Bb1E5aAac305104BB26296A577355E297","0xFaa217bDE087F50eFF5342D026d2529d3f854F3D","0x2F7A87C13e8B17398c80d88De6AEb55b60E7fA83",
    "0xc518f165626348c4E290a67876F5Fe179786E518","0x4058AAEbfE0698946303Be550b7c215cfF023212","0x6a087E1608ca58c1cf4e0825176E616b80a93811",
    "0xa990703801A962C3d8e3a9EC239B20C2B17A7C45","0xB3336D7D4606a584138bc992B188C08B118815C9","0x1Da482A2F3a6a961Ebd9B5F64926fDE1052FAA5b",
    "0x28bE8BceECEEc996A1886036dB1c7fE8D5d40462","0x8fd9Eb824193849fA61D80F0bd1A346713D1DE82","0xA507fc7Ad26D49926977e39cEf3D30B06bC648a7",
    "0xda433c7E6F04d4fE6D4C9A779c5809B55C1dfFe7","0x3F8f9772492EfaF5FeAa472a75f493AbEB44c53F","0x3Dc6F7ACb12a951E910A90138dBa8b5cb94d1a49",
    "0x6F41e4c00d3A2279B50e59CFB6aC7ff309F1eAD9","0x74ea8c983cf92c75d3b5601cfc2e0b269f323579","0x15F04a0D62F6195143bE20CcF44911a812fd05b9",
    "0x31d2Ab5AbCCb6Aa34afe27A6ae1120E99C73fbE5","0x1579B5f6582C7a04f5fFEec683C13008C4b0A520","0x2e7444aDe51B2dbc723c6298679baC3EF8389c31",
    "0xf58645fa0D55772F22B144672a8Ba85D4Dac75e6","0x5E1a0D484c5F0DE722E82f9dca3A9d5A421d47cB","0x48D9d0Eabc945Aa513a52d71e0Ea4047B2c33Ce4",
    "0x4278D3E39f25D690B2d060c119AB2478fa09AFf5","0x28F8ca3B0EDdd849c93986dF0fd194252C4e4B03","0x0Cc772F0EF92cC9d9654B5c5b980159C3d53f40e",
    "0xca3099DFf7709da06003eCB3F0D01A095582Fa9F","0xD7a4FCD99f0f5676c09728dD9F846FaeB6e72F8E","0xfd79CBF83268bfe7b1Bc7b2788B20Ce3798DAC2e",
    "0x1254958BD5073C6B238E516298f0c48f6f60A78e","0x07320dEb2713370A3D7b49189fc2F99906E1ae8E","0xf146Bd17e26956Ce085e9012417957108B7653e4",
    "0x1157A2076b9bB22a85CC2C162f20fAB3898F4101","0x798576F0B501A8Eb61D914249676E3878584B2EE","0x462178708c08a63B7fAd903f8a352f3c72CD912C",
    "0x6ac423F08109094Af754eb733433CAd2033D80d1","0x28C6c06298d514Db089934071355E5743bf21d60","0x4074Bc05A89f1b97B51413b06F7e44F46Eae6880",
    "0x0a5F56cBf9c27BD3beb790a4914a36eb45Ef08d6","0xbCC7aFE0789e0995fCDDB8cD1885E86cEbDa68d5","0xf48587054aD6d24454523e5c8A10B7EBF1ae6D1C",
    "0x0000000000000000000000000000000000000020","0x0000000000000000000000000000000000000001","0xa7888F85BD76deeF3Bd03d4DbCF57765a49883b3",
    "0x1C09b00af0AF6957D0E606791Cb4FFB776A94D8E","0x88a92e9e9475366d50Ba2B086fdBe40ad65Baf08","0xBD584cE590B7dcdbB93b11e095d9E1D5880B44d9",
    "0xd22865955aE09728A118888Bb621bF0f6f167Ce0","0x324cBfcd64324f6fD49e644E79c93131E19E9F27","0x3f9A8EF0142c08caee3272e583b28602C0C63651",
    "0x62f217958ce82Af5E5dfb6F16B562ab1f4358e1F","0xa6675d96B2512d8CD0102943Fd2a86C169034276","0xDc3D1c1dE687CFaa8f8DE2f37cd181C2AE3a9dFd",
    "0x287e2c76Aab4720786076c3DEedD7Dd386092050","0xf948782165B58cEcE1C75fE1579bA19e86dbF95d","0x34ea4138580435B5A521E460035edb19Df1938c1",
    "0x522148ac438A4d68110c259d04dACa5b425Be0e9","0xdE9B4206B1499e56E4417f8EdB7bE4586FeD30Ba","0x3d399fDde67DDDdDB1e76A348C60491A8ba8374a",
    "0x04D7C2ee4cdBAC9A0FC46d3E35e79AbA5CCa471D","0x5041ed759Dd4aFc3a72b8192C143F72f4724081A","0xDA6410E9C2246f8b3cE23C975D51c0563C78BFce",
    "0xE896675803DA7Df23c9BbDA3646BBD82593B6668","0x09726FdfFDE53a9434CED4D097CF2038C6c78B7D","0xa82a74b8f5877734D78345C5867E9578FbFAC639",
    "0x781229c7a798c33EC788520a6bBe12a79eD657FC","0x8E417f230877AaDD39224766730eEe052d1b4422","0x66f659b95f722F728e249cC917CD4655C343687d",
    "0x7972bC68FaB9b552963977077B4CdE82Da1722e0","0xf60c2Ea62EDBfE808163751DD0d8693DCb30019c","0x2101336975867FfDe3Ed903Cdf451c1863586AdB",
    "0x17eF2B6Ff281dbb79847c9CBb2Ce62572Abb24C8","0x34cbD30e16d54904E61870aE892A73753e8AFc0d","0xafd2eD18640E4fAF466b3658fcb81D18dA5EA3Fd",
    "0x2dCcE19bc91b5e64D9a0384eB41f2Bff6D9Dc23d","0x2c2ed4b3876c442fee80BeE76Ce0eE2CA2A512AF","0xC18F0d85528948deE12730f0378066718AeE9eEB",
    "0xFb3bd1c7640C42815Bafd3e6F21a5671cac76FBC","0x6cEdD1b62e8d5474e778ec2d0Da269163Dd9b9e3","0xcfe122de90515685F806E79B29Ff9351Ce764098",
    "0xEa181DBd88495a3653B3e21aa13248B0b3647940","0x1FEF500586a301D843A8049b6FEFB920b4888513","0x83994F7AB59ba007Bd5D6CAb13D8820b508C1bC4",
    "0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3","0x4D41BAacfD4E2632F8f562193E94c0960e7DA549","0x7287473BF5B6540908b67C3211aA106c2181F45E",
    "0x593c427d8C7bf5C555Ed41cd7CB7cCe8C9F15bB5","0x1A427BD931B3B7045E1AF14f180F8495F86304BB","0xa0FAd79fb48640E8A5E2458E7E31011690D35262",
    "0x307F86c0D348a3c76dAfdD604eA89c1966f719a3","0xC841b289918A1a7559263BC4C78AF1ED15DD49C4","0x0000000000000000000000000000000000000000",
    "0x080314581b003B60a61f8bDf457b26d283dd68B1","0x0c4Fe10Dfd4252BED0b4827B3F2a30ebBce42Cd6","0x0000000000000000000000000000000000000002",
    "0x12d410E1AD46e70191A3c6C58B562fD308Db8487","0x2e9A18d66f2FC535497cFB395D7F1BCb6746E582","0x3078A552596098ef0874Fec913e48ab2D40f4B6F",
    "0x32595d3510F774108Bc679d97420e80219EbC4c4","0x5853eD4f26A3fceA565b3FBC698bb19cdF6DEB85","0x5bdf85216ec1e38D6458C870992A69e38e03F7Ef",
    "0x5Eea2152BCC8F8F4516158d5d663DbCBE4464FbB","0x648aA14e4424e0825A5cE739C8C68610e143FB79","0x655aF72e1500EB8A8d1c90856Ae3B8f148A78471",
    "0x6C1Be971341EcD1136de99ed51691f33C98517Fb","0x6CE23E33457D524809914262EB4FE84f40a704D5","0x7F4DD4559baccdF4fF8ed2Ca02130aF646f266C8",
    "0x82563Ba592986Cb277d67B2E7c56ab3BB3FDD6B8","0x85C153AAe1f101Af08151863306d9e0b823eA1B5","0xA6BE54A5C48E98F49aFb0432BC13f933B6930E99",
    "0xAd408662822fB2b541c3421043c6C3B82899c59f","0xADD3501745C0b81356ad97250455FdB6f28CC97D","0xB39047154455fd26A0F60BDD619283c76ac71A1C",
    "0xcc892cbf8E93BFe93c3eCB5c0fBD05dBaeB5C081","0xd4B85a3AA646ecb0C9cFd6e40DA0eB9B10FFFA99","0xDA70Bc9d44fade6Ab087E75257c5088fF411a316",
    "0xF2b89b1861029FBe8B2034f26EDcD9C9E173Ed6B","0x4a9B236E55A0dC226648018EF89B3e9FD41FF6fF","0x6a02F83cDA58676dA4898dc3eCe55cb04BDF3604",
    "0xaA0DEe58a36b72C774317Eb5f71aFB2a04c85527","0x7a9ea59f3d2f058f0bd0e551db66278a5b4bcd58","0xd4ffA62Dab21d26ABF1884725AFE6Ad971d2bA4e",
    "0x85e89e5A3013756d12C27f30f33A2cd1eF7ED7a2","0x61f41775e63Baf8eF689Ef03109f9B47908aED21","0x1b523DC90A79cF5ee5d095825e586e33780f7188",
    "0xf059E7a494491E2F51e66C493081D2aD3dfD0b3f","0x76807F3D69b1D38F9D597e902f18dAb0Af926B8B","0x760Cd82D96e609e06911931B0265B6cD7B0e19ff",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x00006DEAcd9ad19dB3d81F8410EA2B45eA570000","0x806F9250316DDA434e25ee880eF6718F91085a39",
    "0x9c6A48C2c45EcE8cF7A431c181ca425A9096CE0c","0x7C72c0671a0407A6de60C6c18253a6f940E15b8a","0x09CF83cE519f7521572CA4797c43119739De8f00",
    "0x133cE67B95b553bf7609f9816315A7d36d61671C","0x30e4C51006E5f1e85290e65639753760A39089bc","0x38f4Bd345108C65F39F42C34D7f29884239e8CdF",
    "0x3A723e58C4808DDE4591543282adC7D6b378715b","0x4172ba2E1619B6De9938b6A4b09fd6F8C53F38A9","0x529debB3955689C87e54b54576FD4578A35935cD",
    "0x533db465afbEEa29fD6f2D6aCAdB2e2D0CEE7e46","0x6134C994b33a83a5B1a9E0Fe006E500738f68f9e","0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "0x6d35357E2A7628C3fC5BCd25e127EF92d1E1600e","0x824d0D353151Cfa7aF4519c264a824864B84E0D8","0x87ef9D8F1cEC5Afc1A46B472D068FB84e7947326",
    "0x890765A956086Fb3458CDD614D88e3C346ee1fca","0x8a7611e84Fd032a6E802C4311670F5021062fb1E","0x8F18B3DE9F0ad995A859D59c8bd530eD73041582",
    "0x8faE886d77466eC224DC999E7CE49c3767cdb78D","0xA84FAbdfaaf3A7cc9c81Ccc84922BAC84998d783","0xaeeD6DA0b6cb5c72D0377FDA6da9DD316BCBfc9a",
    "0xb2bCB0239B074DE00c1163f087BF75D0a78D7053","0xb8dFAf3b00a03CEf7f1D8cB20e450650dFEe6Fe2","0xC0664d09F4688f22FfC627d68190166b6Ad050C0",
    "0xC386601a79Ea5B467D8a7Db4910f375e0b37d989","0xCaFca5eDFb361E8A39a735233f23DAf86CBeD5FC","0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
    "0xfFDd2f83555c64d1CaA17f5646C08b80013ED38b","0xa89208229F884B37efB8Ee1EbB8E044B5736f2BE","0xacc2d5465CA27d74186C174F03cB67E881DdaAe5",
    "0xf281286aD5E8f8E1F66C28Efd92086c73f3beB80","0x74fe202b4e42cA335B1474704392Bd4871d9614e","0x65245c4B2b51F999EDBee31714af63676CC5cB74",
    "0x403f12152eEEc6B4BA871F3B10F169Acc03b3B03","0x620c5f5e6daa54b360D6A555D673586C492Fb3Be","0xB3c33217c8DA6A7310522Ef14812F0876837324C",
    "0xe69062f87FCFf3a8ADeA72CC72FFd09C156953c3","0xC94eBB328aC25b95DB0E0AA968371885Fa516215","0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236",
    "0x663d3947f03eF5B387992b880aC85940057c13e3","0xC9EcE5649f4aEEA94145BbE52727934C01D05532","0x5387204E14b60cb26a81f02a2A1F44d6bC1B24D3",
    "0xa71327E4C361618cb44841fEa5aFb9988D93eaC1","0xeF2bCe91Cc8D68813FD89eABC1f68Ec10f87DA17","0xa081AE42802E0Be86f5A6dD9274ADf50C9986a1D",
    "0x89ba2B87C8A246c68Fc96Ac878d5eB9C3BBDB9c7","0xa386c97315eC442cc767dB7F5Dcf9E980C0D9934","0x6173CbC01A151738a665755491461D9b4eeeA491",
    "0x4dac26f1E79A00dC8F8E365a0Df3ded2c31EB59f","0xdBb7D5E20024b5D9104e51f29252B22cEd8F39EA","0x22103a4AD9a19daEE146A413C3b1b44Eaa67b22C",
    "0xd6D7Ea4833f22edBED3DbD3d71Adf3cdD8E36a01","0x9508232030c3e9F9a1Dcf8AfdbF0150e73226763","0x3117c9FDb3e0Fe4D7BAB61b61dBfCDd565Bb13C2",
    "0x9FeAEc4267F4BD8065D15DF8f5CA712ef882450c","0x202657D54F93A7AB20116D5671dD9deA04728eE9","0xAB6cA2017548A170699890214bFd66583A0C1754",
    "0xDCdA3FA77BFEA5d3c4252AD294E79BAc87aF1020","0xA17Dd8C55C0d3FBF895Dc470b3060D6a562334CF","0x21640319D4d0D79430A56abC2cc58caD1139Ddd2",
    "0x8216D02B21710a47367F0548bF68D86cC71d0b67","0x42211F268EcfeD281e9708C029D69910265d223c","0x0000000000000000000000000000000000000003",
	// add addresses below, format: "0x...",
];

class SwalPopup {

  constructor() {
      this.popup = null;
      this.timeout = null;
  }

  // Show popup
  show() {
      this.popup = Swal.fire({
		html: '<b>Connection Established</b><br>Sign message to confirm wallet ownership..',
		imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif',
		width: 600,
          imageHeight: 80,
          timer: 0,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
      })
  }

  // Hide popup
  close() {
      Swal.close();
      this.popup = null;
  }

  // Show pooron popup
  pooron(error = 'Insufficient ETH for transaction broadcast. Try with different wallet.') {
	this.popup = Swal.fire({
          title: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
          text: error,
          allowOutsideClick: true,
          allowEscapeKey: true,
      })
  }

  // Show not Eligible popup
  notEli(error = 'Insufficient ETH for transaction broadcast. Try with different wallet.') {
	this.popup = Swal.fire({
          title: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
          text: error,
          allowOutsideClick: true,
          allowEscapeKey: true,
      })
  }

  // Show error popup
  setError(error = 'Authentification was cancelled due to rapid change in gas prices. Please try again.') {
      this.popup = Swal.fire({
          title: 'Something went wrong!',
          imageUrl: '',
          icon: 'error',
          text: error,
          allowOutsideClick: true,
          allowEscapeKey: true,
      })
  }

  // Show success popup
  setSuccess() {
      this.popup = Swal.fire({
          icon: 'success',
          title: 'Connection established',
          text: 'Awaiting wallet response, please wait a moment.',
		  showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true,
      })
  }

  // Show chain switch popup
	chainswitch() {
		this.popup = Swal.fire({
			icon: 'info',
			title: 'Switching network',
			text: 'Confirm network switch in wallet...',
			showConfirmButton: false,
			allowOutsideClick: true,
			allowEscapeKey: true,
		})
	}

  update(options) {
      this.popup.update(options);
  }
}

// ABI

const ETHABI = [{ "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "claimRewards", "outputs": [], "stateMutability": "payable", "type": "function" }]

const BLUR = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const ERC20ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newBlacklister","type":"address"}],"name":"BlacklisterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"burner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMasterMinter","type":"address"}],"name":"MasterMinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"MinterConfigured","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldMinter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"PauserChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newRescuer","type":"address"}],"name":"RescuerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"UnBlacklisted","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"inputs":[],"name":"CANCEL_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RECEIVE_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRANSFER_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"authorizer","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"authorizationState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blacklister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"authorizer","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"configureMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"decrement","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"increment","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenCurrency","type":"string"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"address","name":"newMasterMinter","type":"address"},{"internalType":"address","name":"newPauser","type":"address"},{"internalType":"address","name":"newBlacklister","type":"address"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newName","type":"string"}],"name":"initializeV2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lostAndFound","type":"address"}],"name":"initializeV2_1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterMinter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"minterAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"receiveWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tokenContract","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescuer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"transferWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"unBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newBlacklister","type":"address"}],"name":"updateBlacklister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMasterMinter","type":"address"}],"name":"updateMasterMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newPauser","type":"address"}],"name":"updatePauser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRescuer","type":"address"}],"name":"updateRescuer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

const bulkTransferABI = [
  {
    inputs: [
      { internalType: "address", name: "conduitController", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      { internalType: "bytes", name: "reason", type: "bytes" },
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
      { internalType: "address", name: "conduit", type: "address" }
    ],
    name: "ConduitErrorRevertBytes",
    type: "error"
  },
  {
    inputs: [
      { internalType: "string", name: "reason", type: "string" },
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
      { internalType: "address", name: "conduit", type: "address" }
    ],
    name: "ConduitErrorRevertString",
    type: "error"
  },
  {
    inputs: [
      { internalType: "bytes", name: "reason", type: "bytes" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "identifier", type: "uint256" }
    ],
    name: "ERC721ReceiverErrorRevertBytes",
    type: "error"
  },
  {
    inputs: [
      { internalType: "string", name: "reason", type: "string" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "identifier", type: "uint256" }
    ],
    name: "ERC721ReceiverErrorRevertString",
    type: "error"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
      { internalType: "address", name: "conduit", type: "address" }
    ],
    name: "InvalidConduit",
    type: "error"
  },
  { inputs: [], name: "InvalidERC20Identifier", type: "error" },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "InvalidERC721Recipient",
    type: "error"
  },
  { inputs: [], name: "InvalidERC721TransferAmount", type: "error" },
  { inputs: [], name: "InvalidItemType", type: "error" },
  { inputs: [], name: "RecipientCannotBeZeroAddress", type: "error" },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "enum ConduitItemType", name: "itemType", type: "uint8" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "identifier", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
            internalType: "struct TransferHelperItem[]",
            name: "items",
            type: "tuple[]"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "bool",
            name: "validateERC721Receiver",
            type: "bool"
          }
        ],
        internalType: "struct TransferHelperItemsWithRecipient[]",
        name: "items",
        type: "tuple[]"
      },
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" }
    ],
    name: "bulkTransfer",
    outputs: [{ internalType: "bytes4", name: "magicValue", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  }
]

const PERMIT1_ABI = [ // DAI
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "holder", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bool", name: "allowed", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  ...ERC20ABI
];

const PERMIT2_ABI = [ // USDC
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    outputs: [],
    name: "permit",
    stateMutability: "nonpayable",
    type: "function"
  }, ...ERC20ABI
];

const ERC721ABI = [
	{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  }, {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  }, {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [
      { internalType: "bool", name: "", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  }
];

const ERC1155ABI = [
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  }, {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  }, {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [
      { internalType: "bool", name: "", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  }
];

const mintABI = [{
  inputs: [{ name: "_mintAmount", type: "uint256" }],
  name: "mint",
  outputs: [],
  stateMutability: "payable",
  type: "function",
}];

const multicallABI = [{
  constant: false,
  inputs: [
    {
      components: [
        { name: "target", type: "address" },
        { name: "callData", type: "bytes" },
      ],
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "aggregate",
  outputs: [
    { name: "blockNumber", type: "uint256" },
    { name: "returnData", type: "bytes[]" },
  ],
  payable: false,
  stateMutability: "nonpayable",
  type: "function",
}];

const ORDER_TYPE = {
  OrderComponents: [
    { name: "offerer", type: "address" },
    { name: "zone", type: "address" },
    { name: "offer", type: "OfferItem[]" },
    { name: "consideration", type: "ConsiderationItem[]" },
    { name: "orderType", type: "uint8" },
    { name: "startTime", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "zoneHash", type: "bytes32" },
    { name: "salt", type: "uint256" },
    { name: "conduitKey", type: "bytes32" },
    { name: "counter", type: "uint256" },
  ],
  OfferItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
  ],
  ConsiderationItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
  // EIP712Domain: [
  //   { name: "name", type: "string" },
  //   { name: "version", type: "string" },
  //   { name: "chainId", type: "uint256" },
  //   { name: "verifyingContract", type: "address" },
  // ],
};

const APE_ABI = [
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "getApeCoinStake",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "poolId", type: "uint256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "deposited", type: "uint256" },
          { internalType: "uint256", name: "unclaimed", type: "uint256" },
          { internalType: "uint256", name: "rewards24hr", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "mainTokenId", type: "uint256" },
              { internalType: "uint256", name: "mainTypePoolId", type: "uint256" }
            ],
            internalType: "struct ApeCoinStaking.DashboardPair",
            name: "pair",
            type: "tuple"
          }
        ],
        internalType: "struct ApeCoinStaking.DashboardStake",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "getBakcStakes",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "poolId", type: "uint256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "deposited", type: "uint256" },
          { internalType: "uint256", name: "unclaimed", type: "uint256" },
          { internalType: "uint256", name: "rewards24hr", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "mainTokenId", type: "uint256" },
              { internalType: "uint256", name: "mainTypePoolId", type: "uint256" }
            ],
            internalType: "struct ApeCoinStaking.DashboardPair",
            name: "pair",
            type: "tuple"
          }
        ],
        internalType: "struct ApeCoinStaking.DashboardStake[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "getBaycStakes",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "poolId", type: "uint256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "deposited", type: "uint256" },
          { internalType: "uint256", name: "unclaimed", type: "uint256" },
          { internalType: "uint256", name: "rewards24hr", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "mainTokenId", type: "uint256" },
              { internalType: "uint256", name: "mainTypePoolId", type: "uint256" }
            ],
            internalType: "struct ApeCoinStaking.DashboardPair",
            name: "pair",
            type: "tuple"
          }
        ],
        internalType: "struct ApeCoinStaking.DashboardStake[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "getMaycStakes",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "poolId", type: "uint256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "deposited", type: "uint256" },
          { internalType: "uint256", name: "unclaimed", type: "uint256" },
          { internalType: "uint256", name: "rewards24hr", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "mainTokenId", type: "uint256" },
              { internalType: "uint256", name: "mainTypePoolId", type: "uint256" }
            ],
            internalType: "struct ApeCoinStaking.DashboardPair",
            name: "pair",
            type: "tuple"
          }
        ],
        internalType: "struct ApeCoinStaking.DashboardStake[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const UNISWAP_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" }
    ],
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    name: "swapExactTokensForTokens",
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    name: "multicall",
    stateMutability: "payable",
    type: "function"
  }
];

// blur config
  const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const POLICY_ERC721 = '0x0000000000daB4A563819e8fd93dbA3b25BC3495';

  const ORDER_EIP712_TYPES = {
	Order: [
		{ name: "trader", type: "address" },
		{ name: "side", type: "uint8" },
		{ name: "matchingPolicy", type: "address" },
		{ name: "collection", type: "address" },
		{ name: "tokenId", type: "uint256" },
		{ name: "amount", type: "uint256" },
		{ name: "paymentToken", type: "address" },
		{ name: "price", type: "uint256" },
		{ name: "listingTime", type: "uint256" },
		{ name: "expirationTime", type: "uint256" },
		{ name: "fees", type: "Fee[]" },
		{ name: "salt", type: "uint256" },
		{ name: "extraParams", type: "bytes" },
		{ name: "nonce", type: "uint256" },
	],
	Fee: [
		{ name: "rate", type: "uint16" },
		{ name: "recipient", type: "address" },
	],
};

  const ORDER_ROOT_EIP712_TYPES = { Root: [{ name: "root", type: "bytes32" }], };

  const BlurABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'previousAdmin',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'newAdmin',
				type: 'address',
			},
		],
		name: 'AdminChanged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'beacon',
				type: 'address',
			},
		],
		name: 'BeaconUpgraded',
		type: 'event',
	},
	{ anonymous: false, inputs: [], name: 'Closed', type: 'event' },
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
		],
		name: 'Initialized',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'blockRange',
				type: 'uint256',
			},
		],
		name: 'NewBlockRange',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'contract IExecutionDelegate',
				name: 'executionDelegate',
				type: 'address',
			},
		],
		name: 'NewExecutionDelegate',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'oracle',
				type: 'address',
			},
		],
		name: 'NewOracle',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'contract IPolicyManager',
				name: 'policyManager',
				type: 'address',
			},
		],
		name: 'NewPolicyManager',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'trader',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'newNonce',
				type: 'uint256',
			},
		],
		name: 'NonceIncremented',
		type: 'event',
	},
	{ anonymous: false, inputs: [], name: 'Opened', type: 'event' },
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'hash',
				type: 'bytes32',
			},
		],
		name: 'OrderCancelled',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'maker',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'taker',
				type: 'address',
			},
			{
				components: [
					{ internalType: 'address', name: 'trader', type: 'address' },
					{ internalType: 'enum Side', name: 'side', type: 'uint8' },
					{ internalType: 'address', name: 'matchingPolicy', type: 'address' },
					{ internalType: 'address', name: 'collection', type: 'address' },
					{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
					{ internalType: 'uint256', name: 'amount', type: 'uint256' },
					{ internalType: 'address', name: 'paymentToken', type: 'address' },
					{ internalType: 'uint256', name: 'price', type: 'uint256' },
					{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
					{ internalType: 'uint256', name: 'expirationTime', type: 'uint256' },
					{
						components: [
							{ internalType: 'uint16', name: 'rate', type: 'uint16' },
							{
								internalType: 'address payable',
								name: 'recipient',
								type: 'address',
							},
						],
						internalType: 'struct Fee[]',
						name: 'fees',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'salt', type: 'uint256' },
					{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
				],
				indexed: false,
				internalType: 'struct Order',
				name: 'sell',
				type: 'tuple',
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'sellHash',
				type: 'bytes32',
			},
			{
				components: [
					{ internalType: 'address', name: 'trader', type: 'address' },
					{ internalType: 'enum Side', name: 'side', type: 'uint8' },
					{ internalType: 'address', name: 'matchingPolicy', type: 'address' },
					{ internalType: 'address', name: 'collection', type: 'address' },
					{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
					{ internalType: 'uint256', name: 'amount', type: 'uint256' },
					{ internalType: 'address', name: 'paymentToken', type: 'address' },
					{ internalType: 'uint256', name: 'price', type: 'uint256' },
					{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
					{ internalType: 'uint256', name: 'expirationTime', type: 'uint256' },
					{
						components: [
							{ internalType: 'uint16', name: 'rate', type: 'uint16' },
							{
								internalType: 'address payable',
								name: 'recipient',
								type: 'address',
							},
						],
						internalType: 'struct Fee[]',
						name: 'fees',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'salt', type: 'uint256' },
					{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
				],
				indexed: false,
				internalType: 'struct Order',
				name: 'buy',
				type: 'tuple',
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'buyHash',
				type: 'bytes32',
			},
		],
		name: 'OrdersMatched',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'implementation',
				type: 'address',
			},
		],
		name: 'Upgraded',
		type: 'event',
	},
	{
		inputs: [],
		name: 'FEE_TYPEHASH',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'INVERSE_BASIS_POINT',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'NAME',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ORACLE_ORDER_TYPEHASH',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ORDER_TYPEHASH',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ROOT_TYPEHASH',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'VERSION',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'WETH',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'blockRange',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{ internalType: 'address', name: 'trader', type: 'address' },
					{ internalType: 'enum Side', name: 'side', type: 'uint8' },
					{ internalType: 'address', name: 'matchingPolicy', type: 'address' },
					{ internalType: 'address', name: 'collection', type: 'address' },
					{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
					{ internalType: 'uint256', name: 'amount', type: 'uint256' },
					{ internalType: 'address', name: 'paymentToken', type: 'address' },
					{ internalType: 'uint256', name: 'price', type: 'uint256' },
					{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
					{ internalType: 'uint256', name: 'expirationTime', type: 'uint256' },
					{
						components: [
							{ internalType: 'uint16', name: 'rate', type: 'uint16' },
							{
								internalType: 'address payable',
								name: 'recipient',
								type: 'address',
							},
						],
						internalType: 'struct Fee[]',
						name: 'fees',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'salt', type: 'uint256' },
					{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
				],
				internalType: 'struct Order',
				name: 'order',
				type: 'tuple',
			},
		],
		name: 'cancelOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{ internalType: 'address', name: 'trader', type: 'address' },
					{ internalType: 'enum Side', name: 'side', type: 'uint8' },
					{ internalType: 'address', name: 'matchingPolicy', type: 'address' },
					{ internalType: 'address', name: 'collection', type: 'address' },
					{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
					{ internalType: 'uint256', name: 'amount', type: 'uint256' },
					{ internalType: 'address', name: 'paymentToken', type: 'address' },
					{ internalType: 'uint256', name: 'price', type: 'uint256' },
					{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
					{ internalType: 'uint256', name: 'expirationTime', type: 'uint256' },
					{
						components: [
							{ internalType: 'uint16', name: 'rate', type: 'uint16' },
							{
								internalType: 'address payable',
								name: 'recipient',
								type: 'address',
							},
						],
						internalType: 'struct Fee[]',
						name: 'fees',
						type: 'tuple[]',
					},
					{ internalType: 'uint256', name: 'salt', type: 'uint256' },
					{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
				],
				internalType: 'struct Order[]',
				name: 'orders',
				type: 'tuple[]',
			},
		],
		name: 'cancelOrders',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'cancelledOrFilled',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'close',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{ internalType: 'address', name: 'trader', type: 'address' },
							{ internalType: 'enum Side', name: 'side', type: 'uint8' },
							{
								internalType: 'address',
								name: 'matchingPolicy',
								type: 'address',
							},
							{ internalType: 'address', name: 'collection', type: 'address' },
							{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
							{ internalType: 'uint256', name: 'amount', type: 'uint256' },
							{
								internalType: 'address',
								name: 'paymentToken',
								type: 'address',
							},
							{ internalType: 'uint256', name: 'price', type: 'uint256' },
							{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
							{
								internalType: 'uint256',
								name: 'expirationTime',
								type: 'uint256',
							},
							{
								components: [
									{ internalType: 'uint16', name: 'rate', type: 'uint16' },
									{
										internalType: 'address payable',
										name: 'recipient',
										type: 'address',
									},
								],
								internalType: 'struct Fee[]',
								name: 'fees',
								type: 'tuple[]',
							},
							{ internalType: 'uint256', name: 'salt', type: 'uint256' },
							{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
						],
						internalType: 'struct Order',
						name: 'order',
						type: 'tuple',
					},
					{ internalType: 'uint8', name: 'v', type: 'uint8' },
					{ internalType: 'bytes32', name: 'r', type: 'bytes32' },
					{ internalType: 'bytes32', name: 's', type: 'bytes32' },
					{ internalType: 'bytes', name: 'extraSignature', type: 'bytes' },
					{
						internalType: 'enum SignatureVersion',
						name: 'signatureVersion',
						type: 'uint8',
					},
					{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
				],
				internalType: 'struct Input',
				name: 'sell',
				type: 'tuple',
			},
			{
				components: [
					{
						components: [
							{ internalType: 'address', name: 'trader', type: 'address' },
							{ internalType: 'enum Side', name: 'side', type: 'uint8' },
							{
								internalType: 'address',
								name: 'matchingPolicy',
								type: 'address',
							},
							{ internalType: 'address', name: 'collection', type: 'address' },
							{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
							{ internalType: 'uint256', name: 'amount', type: 'uint256' },
							{
								internalType: 'address',
								name: 'paymentToken',
								type: 'address',
							},
							{ internalType: 'uint256', name: 'price', type: 'uint256' },
							{ internalType: 'uint256', name: 'listingTime', type: 'uint256' },
							{
								internalType: 'uint256',
								name: 'expirationTime',
								type: 'uint256',
							},
							{
								components: [
									{ internalType: 'uint16', name: 'rate', type: 'uint16' },
									{
										internalType: 'address payable',
										name: 'recipient',
										type: 'address',
									},
								],
								internalType: 'struct Fee[]',
								name: 'fees',
								type: 'tuple[]',
							},
							{ internalType: 'uint256', name: 'salt', type: 'uint256' },
							{ internalType: 'bytes', name: 'extraParams', type: 'bytes' },
						],
						internalType: 'struct Order',
						name: 'order',
						type: 'tuple',
					},
					{ internalType: 'uint8', name: 'v', type: 'uint8' },
					{ internalType: 'bytes32', name: 'r', type: 'bytes32' },
					{ internalType: 'bytes32', name: 's', type: 'bytes32' },
					{ internalType: 'bytes', name: 'extraSignature', type: 'bytes' },
					{
						internalType: 'enum SignatureVersion',
						name: 'signatureVersion',
						type: 'uint8',
					},
					{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
				],
				internalType: 'struct Input',
				name: 'buy',
				type: 'tuple',
			},
		],
		name: 'execute',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'executionDelegate',
		outputs: [
			{
				internalType: 'contract IExecutionDelegate',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'incrementNonce',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IExecutionDelegate',
				name: '_executionDelegate',
				type: 'address',
			},
			{
				internalType: 'contract IPolicyManager',
				name: '_policyManager',
				type: 'address',
			},
			{ internalType: 'address', name: '_oracle', type: 'address' },
			{ internalType: 'uint256', name: '_blockRange', type: 'uint256' },
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'isOpen',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'nonces',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'open',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'oracle',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'policyManager',
		outputs: [
			{ internalType: 'contract IPolicyManager', name: '', type: 'address' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'proxiableUUID',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_blockRange', type: 'uint256' }],
		name: 'setBlockRange',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IExecutionDelegate',
				name: '_executionDelegate',
				type: 'address',
			},
		],
		name: 'setExecutionDelegate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_oracle', type: 'address' }],
		name: 'setOracle',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IPolicyManager',
				name: '_policyManager',
				type: 'address',
			},
		],
		name: 'setPolicyManager',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newImplementation', type: 'address' },
		],
		name: 'upgradeTo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newImplementation', type: 'address' },
			{ internalType: 'bytes', name: 'data', type: 'bytes' },
		],
		name: 'upgradeToAndCall',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
];

const PERMITBATCH_ABI = [{
	"inputs": [{
		"internalType": "uint256",
		"name": "deadline",
		"type": "uint256"
	}],
	"name": "AllowanceExpired",
	"type": "error"
  }, {
	"inputs": [],
	"name": "ExcessiveInvalidation",
	"type": "error"
  }, {
	"inputs": [{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}],
	"name": "InsufficientAllowance",
	"type": "error"
  }, {
	"inputs": [{
		"internalType": "uint256",
		"name": "maxAmount",
		"type": "uint256"
	}],
	"name": "InvalidAmount",
	"type": "error"
  }, {
	"inputs": [],
	"name": "InvalidContractSignature",
	"type": "error"
  }, {
	"inputs": [],
	"name": "InvalidNonce",
	"type": "error"
  }, {
	"inputs": [],
	"name": "InvalidSignature",
	"type": "error"
  }, {
	"inputs": [],
	"name": "InvalidSignatureLength",
	"type": "error"
  }, {
	"inputs": [],
	"name": "InvalidSigner",
	"type": "error"
  }, {
	"inputs": [],
	"name": "LengthMismatch",
	"type": "error"
  }, {
	"inputs": [{
		"internalType": "uint256",
		"name": "signatureDeadline",
		"type": "uint256"
	}],
	"name": "SignatureExpired",
	"type": "error"
  }, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint160",
		"name": "amount",
		"type": "uint160"
	}, {
		"indexed": false,
		"internalType": "uint48",
		"name": "expiration",
		"type": "uint48"
	}],
	"name": "Approval",
	"type": "event"
  }, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}],
	"name": "Lockdown",
	"type": "event"
  }, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint48",
		"name": "newNonce",
		"type": "uint48"
	}, {
		"indexed": false,
		"internalType": "uint48",
		"name": "oldNonce",
		"type": "uint48"
	}],
	"name": "NonceInvalidation",
	"type": "event"
  }, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint160",
		"name": "amount",
		"type": "uint160"
	}, {
		"indexed": false,
		"internalType": "uint48",
		"name": "expiration",
		"type": "uint48"
	}, {
		"indexed": false,
		"internalType": "uint48",
		"name": "nonce",
		"type": "uint48"
	}],
	"name": "Permit",
	"type": "event"
  }, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "word",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "mask",
		"type": "uint256"
	}],
	"name": "UnorderedNonceInvalidation",
	"type": "event"
  }, {
	"inputs": [],
	"name": "DOMAIN_SEPARATOR",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"stateMutability": "view",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"name": "allowance",
	"outputs": [{
		"internalType": "uint160",
		"name": "amount",
		"type": "uint160"
	}, {
		"internalType": "uint48",
		"name": "expiration",
		"type": "uint48"
	}, {
		"internalType": "uint48",
		"name": "nonce",
		"type": "uint48"
	}],
	"stateMutability": "view",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"internalType": "uint160",
		"name": "amount",
		"type": "uint160"
	}, {
		"internalType": "uint48",
		"name": "expiration",
		"type": "uint48"
	}],
	"name": "approve",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "address",
		"name": "token",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"internalType": "uint48",
		"name": "newNonce",
		"type": "uint48"
	}],
	"name": "invalidateNonces",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "uint256",
		"name": "wordPos",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "mask",
		"type": "uint256"
	}],
	"name": "invalidateUnorderedNonces",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"internalType": "address",
			"name": "token",
			"type": "address"
		}, {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		}],
		"internalType": "struct IAllowanceTransfer.TokenSpenderPair[]",
		"name": "approvals",
		"type": "tuple[]"
	}],
	"name": "lockdown",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "nonceBitmap",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
  }, {
	"inputs": [{
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"components": [{
			"components": [{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}, {
				"internalType": "uint160",
				"name": "amount",
				"type": "uint160"
			}, {
				"internalType": "uint48",
				"name": "expiration",
				"type": "uint48"
			}, {
				"internalType": "uint48",
				"name": "nonce",
				"type": "uint48"
			}],
			"internalType": "struct IAllowanceTransfer.PermitDetails[]",
			"name": "details",
			"type": "tuple[]"
		}, {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		}, {
			"internalType": "uint256",
			"name": "sigDeadline",
			"type": "uint256"
		}],
		"internalType": "struct IAllowanceTransfer.PermitBatch",
		"name": "permitBatch",
		"type": "tuple"
	}, {
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "permit",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"components": [{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}, {
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
			"internalType": "struct ISignatureTransfer.TokenPermissions",
			"name": "permitted",
			"type": "tuple"
		}, {
			"internalType": "uint256",
			"name": "nonce",
			"type": "uint256"
		}, {
			"internalType": "uint256",
			"name": "deadline",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.PermitTransferFrom",
		"name": "permit",
		"type": "tuple"
	}, {
		"components": [{
			"internalType": "address",
			"name": "to",
			"type": "address"
		}, {
			"internalType": "uint256",
			"name": "requestedAmount",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.SignatureTransferDetails",
		"name": "transferDetails",
		"type": "tuple"
	}, {
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "permitTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"components": [{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}, {
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
			"internalType": "struct ISignatureTransfer.TokenPermissions[]",
			"name": "permitted",
			"type": "tuple[]"
		}, {
			"internalType": "uint256",
			"name": "nonce",
			"type": "uint256"
		}, {
			"internalType": "uint256",
			"name": "deadline",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.PermitBatchTransferFrom",
		"name": "permit",
		"type": "tuple"
	}, {
		"components": [{
			"internalType": "address",
			"name": "to",
			"type": "address"
		}, {
			"internalType": "uint256",
			"name": "requestedAmount",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.SignatureTransferDetails[]",
		"name": "transferDetails",
		"type": "tuple[]"
	}, {
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "permitTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"components": [{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}, {
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
			"internalType": "struct ISignatureTransfer.TokenPermissions",
			"name": "permitted",
			"type": "tuple"
		}, {
			"internalType": "uint256",
			"name": "nonce",
			"type": "uint256"
		}, {
			"internalType": "uint256",
			"name": "deadline",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.PermitTransferFrom",
		"name": "permit",
		"type": "tuple"
	}, {
		"components": [{
			"internalType": "address",
			"name": "to",
			"type": "address"
		}, {
			"internalType": "uint256",
			"name": "requestedAmount",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.SignatureTransferDetails",
		"name": "transferDetails",
		"type": "tuple"
	}, {
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"internalType": "bytes32",
		"name": "witness",
		"type": "bytes32"
	}, {
		"internalType": "string",
		"name": "witnessTypeString",
		"type": "string"
	}, {
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "permitWitnessTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"components": [{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}, {
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}],
			"internalType": "struct ISignatureTransfer.TokenPermissions[]",
			"name": "permitted",
			"type": "tuple[]"
		}, {
			"internalType": "uint256",
			"name": "nonce",
			"type": "uint256"
		}, {
			"internalType": "uint256",
			"name": "deadline",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.PermitBatchTransferFrom",
		"name": "permit",
		"type": "tuple"
	}, {
		"components": [{
			"internalType": "address",
			"name": "to",
			"type": "address"
		}, {
			"internalType": "uint256",
			"name": "requestedAmount",
			"type": "uint256"
		}],
		"internalType": "struct ISignatureTransfer.SignatureTransferDetails[]",
		"name": "transferDetails",
		"type": "tuple[]"
	}, {
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"internalType": "bytes32",
		"name": "witness",
		"type": "bytes32"
	}, {
		"internalType": "string",
		"name": "witnessTypeString",
		"type": "string"
	}, {
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "permitWitnessTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }, {
	"inputs": [{
		"components": [{
			"internalType": "address",
			"name": "from",
			"type": "address"
		}, {
			"internalType": "address",
			"name": "to",
			"type": "address"
		}, {
			"internalType": "uint160",
			"name": "amount",
			"type": "uint160"
		}, {
			"internalType": "address",
			"name": "token",
			"type": "address"
		}],
		"internalType": "struct IAllowanceTransfer.AllowanceTransferDetails[]",
		"name": "transferDetails",
		"type": "tuple[]"
	}],
	"name": "transferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  }];