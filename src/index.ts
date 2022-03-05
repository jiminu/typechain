import * as CryptoJS from "crypto-js";

class Block {
    constructor(
        public index       : number,
        public hash        : string,
        public previousHash: string,
        public data        : string,
        public timeStamp   : number) {
            this.index        = index;
            this.hash         = hash;
            this.previousHash = previousHash;
            this.data         = data;
            this.timeStamp    = timeStamp;
        }
    
    static calculateBlockHash = (index: number, previousHash: string, timeStamp: number, data: string): string => CryptoJS.SHA256(index, + 
                                                                                                                                  previousHash + 
                                                                                                                                  timeStamp + 
                                                                                                                                  data).toString();
    static validateStructure = (block: Block): boolean => 
        typeof block.index === "number" && 
        typeof block.hash === "string" && 
        typeof block.previousHash === "string" && 
        typeof block.timeStamp === "number" &&
        typeof block.data === "string";
        
}

const genesisBlock:Block = new Block(0, "2020", "", "hello", 123456);

let blockChain: [Block] = [genesisBlock];

const getBlockChain   = () : Block[] => blockChain;
const getLatestBlock  = () : Block   => blockChain[blockChain.length - 1];
const getNewTimeStamp = () : number  => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (block: Block): string => Block.calculateBlockHash(block.index,
                                                                           block.previousHash,
                                                                           block.timeStamp,
                                                                           block.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    } 
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export{}