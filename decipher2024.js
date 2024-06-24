import { blockStalkerClient, restClient, FilterFormBuilder, NumericCondition, KeyGroup, KeyType, KeyEvent } from '@blockstalker/client-js';

/*
███████╗███████╗████████╗██╗   ██╗██████╗ 
██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
███████╗█████╗     ██║   ██║   ██║██████╔╝
╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
███████║███████╗   ██║   ╚██████╔╝██║     
╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
*/                                        

const local_apiKey = 'INSERT_YOUR_API_KEY_HERE';
// Note: If NodeJS > 20, we recommend using a .env file for your API key
const apiBaseURL = "https://api.blockstalker.io";
const apiKey = process.env.BLOCKSTALKER_API_KEY || local_apiKey;
const mainClient = blockStalkerClient(apiKey, apiBaseURL);

// Init RestClient, set `trace` to `false` for quieter operation
const rc = restClient(apiKey, apiBaseURL, { trace: true });
// Get Personal Stream
const streams = await rc.streams.owned();
const personalStream = streams.personal;
console.log("Personal stream:", personalStream);
 
/*
██╗   ██╗███████╗██████╗  ██████╗
██║   ██║██╔════╝██╔══██╗██╔════╝
██║   ██║███████╗██║  ██║██║     
██║   ██║╚════██║██║  ██║██║     
╚██████╔╝███████║██████╔╝╚██████╗
 ╚═════╝ ╚══════╝╚═════╝  ╚═════╝
*/

// Follow all USDC Transfers >= $5
const usdcFilter = new FilterFormBuilder()
    .keyFilter('31566704', KeyEvent.AssetXfer)
    .stream(personalStream)
    .amount(5, NumericCondition.GreaterOrEqual)
    .build();

await rc.filters.create(usdcFilter);

/*
 ██████╗  ██████╗ ██╗   ██╗
██╔════╝ ██╔═══██╗██║   ██║
██║  ███╗██║   ██║██║   ██║
██║   ██║██║   ██║╚██╗ ██╔╝
╚██████╔╝╚██████╔╝ ╚████╔╝ 
 ╚═════╝  ╚═════╝   ╚═══╝  
*/

// Follow all Governance Voting Activity
const govFilter = new FilterFormBuilder()
    .idFilter(KeyGroup.Governance, KeyType.Account)
    .subscribe(KeyEvent.GovernanceTx)
    .stream(personalStream)
    .build();

await rc.filters.create(govFilter);

/*
███╗   ██╗███████╗████████╗
████╗  ██║██╔════╝╚══██╔══╝
██╔██╗ ██║█████╗     ██║   
██║╚██╗██║██╔══╝     ██║   
██║ ╚████║██║        ██║   
╚═╝  ╚═══╝╚═╝        ╚═╝   
*/

// Follow all Marketplace Listings for ALGOxNFT
const nftFilter = new FilterFormBuilder()
    .keyFilter("XNFT36FUCFRR6CK675FW4BEBCCCOJ4HOSMGCN6J2W6ZMB34KM2ENTNQCP4")
    .subscribe(KeyEvent.MarketplaceListing)
    .stream(personalStream)
    .build();

await rc.filters.create(nftFilter);

/*
███████╗████████╗██████╗ ███████╗ █████╗ ███╗   ███╗    ██╗████████╗██╗
██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗████╗ ████║    ██║╚══██╔══╝██║
███████╗   ██║   ██████╔╝█████╗  ███████║██╔████╔██║    ██║   ██║   ██║
╚════██║   ██║   ██╔══██╗██╔══╝  ██╔══██║██║╚██╔╝██║    ██║   ██║   ╚═╝
███████║   ██║   ██║  ██║███████╗██║  ██║██║ ╚═╝ ██║    ██║   ██║   ██╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝   ╚═╝   ╚═╝                                                                     
*/

function handleEvent(event) {
    // Handle your streaming events here
    console.log(event);
}

const streamConnection = mainClient.streaming.events(handleEvent, [ personalStream ]);