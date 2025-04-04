Unauthenticated REST Interface
==============================

The REST API can be enabled with the `-rest` option.

The interface runs on the same port as the JSON-RPC interface, by default port 11931 for mainnet, port 21931 for testnet, and port 31931 for regtest.

Supported API
-------------

#### Transactions
`GET /rest/tx/<TX-HASH>.<bin|hex|json>`

Given a transaction hash: returns a transaction in binary, hex-encoded binary, or JSON formats.

For full TX query capability, one must enable the transaction index via "txindex=1" command line / configuration option.

#### Blocks
`GET /rest/block/<BLOCK-HASH>.<bin|hex|json>`
`GET /rest/block/notxdetails/<BLOCK-HASH>.<bin|hex|json>`

Given a block hash: returns a block, in binary, hex-encoded binary or JSON formats.

The HTTP request and response are both handled entirely in-memory, thus making maximum memory usage at least 2.66MB (1 MB max block, plus hex encoding) per request.

With the /notxdetails/ option JSON response will only contain the transaction hash instead of the complete transaction details. The option only affects the JSON response.

#### Blockheaders
`GET /rest/headers/<COUNT>/<BLOCK-HASH>.<bin|hex|json>`

Given a block hash: returns <COUNT> amount of blockheaders in upward direction.

#### Chaininfos
`GET /rest/chaininfo.json`

Returns various state info regarding block chain processing.
Only supports JSON as output format.
* chain : (string) current network name as defined in BIP70 (main, test, regtest)
* blocks : (numeric) the current number of blocks processed in the server
* headers : (numeric) the current number of headers we have validated
* bestblockhash : (string) the hash of the currently best block
* difficulty : (numeric) the current difficulty
* mediantime : (numeric) the median time of the 11 blocks before the most recent block on the blockchain
* verificationprogress : (numeric) estimate of verification progress [0..1]
* chainwork : (string) total amount of work in active chain, in hexadecimal
* pruned : (boolean) if the blocks are subject to pruning
* pruneheight : (numeric) highest block available
* softforks : (array) status of softforks in progress
* bip9_softforks : (object) status of BIP9 softforks in progress

#### Query UTXO set
`GET /rest/getutxos/<checkmempool>/<txid>-<n>/<txid>-<n>/.../<txid>-<n>.<bin|hex|json>`

The getutxo command allows querying of the UTXO set given a set of outpoints.
See BIP64 for input and output serialisation:
https://github.com/bitcoin/bips/blob/master/bip-0064.mediawiki

Example:
```
$ curl localhost:18332/rest/getutxos/checkmempool/b2cdfd7b89def827ff8af7cd9bff7627ff72e5e8b0f71210f92ea7a4000c5d75-0.json 2>/dev/null | json_pp
{
   "chainHeight" : 325347,
   "utxos" : [
      {
         "height" : 2147483647,
         "value" : 20.00000000,
         "scriptPubKey" : {
            "asm" : "OP_DUP OP_HASH160 89abcdefab... OP_EQUALVERIFY OP_CHECKSIG",
            "hex" : "76a91489abcdefabbaabbaabbaabbaabbaabbaabbaabbaabba88ac",
            "type" : "pubkeyhash",
            "address" : "12c6DSiU4Rq3P4ZxziKxzrL5LmM4pNX4ST"
         }
      }
   ]
}
```