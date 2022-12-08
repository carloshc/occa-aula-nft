const { expect } = require("chai");

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((f) => f.deployed());
}

describe("Coffe", function () {
  before(async function () {
    [this.owner, ...this.addrs] = await ethers.getSigners();

    this.coffe = await deploy("Coffe");
  });

  describe("Initial state check", function () {
    it("Should have correct name", async function () {
      expect(await this.coffe.name()).to.eq("Coffe NFT Token");
    });

    it("Should have correct symbol", async function () {
      expect(await this.coffe.symbol()).to.eq("COFF");
    });

    it("Should have correct default baseURI", async function () {
      expect(await this.coffe.baseURI()).to.eq(
        "https://statics.fazendadecafe.com.br/"
      );
    });

    it("Should max supply is 100", async function () {
      expect(await this.coffe.maxSupply()).to.eq(100);
    });

    it("Should have zero minted tokens", async function () {
      expect(await this.coffe.totalSupply()).to.eq(0);
    });
  });

  describe("Token minting and transfer", function () {
    it("Should mint token #1 to Address 1", async function () {
      const tx = await this.coffe.mint(this.addrs[1].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(1);
      expect(await this.coffe.balanceOf(this.addrs[1].address)).to.eq(1);
    });

    it("Should mint token #2 to Address 3", async function () {
      const tx = await this.coffe.mint(this.addrs[3].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(2);
      expect(await this.coffe.balanceOf(this.addrs[3].address)).to.eq(1);
    });

    it("Should mint token #3 to Address 8", async function () {
      const tx = await this.coffe.mint(this.addrs[8].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(3);
      expect(await this.coffe.balanceOf(this.addrs[8].address)).to.eq(1);
    });

    it("Shouldn't transfer token because not reached the minimum amount of token minted (3)", async function () {
      await expect(
        this.coffe
          .connect(this.addrs[1])
          .transferFrom(this.addrs[1].address, this.addrs[10].address, 0)
      ).to.be.revertedWith("Coffe: insufficient tokens minted");
    });

    it("Should mint token #4 to Address 2", async function () {
      const tx = await this.coffe.mint(this.addrs[2].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(4);
      expect(await this.coffe.balanceOf(this.addrs[2].address)).to.eq(1);
    });

    it("Should mint token #5 to Address 4", async function () {
      const tx = await this.coffe.mint(this.addrs[4].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(5);
      expect(await this.coffe.balanceOf(this.addrs[4].address)).to.eq(1);
    });

    it("Should mint token #6 to Address 5", async function () {
      const tx = await this.coffe.mint(this.addrs[5].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(6);
      expect(await this.coffe.balanceOf(this.addrs[5].address)).to.eq(1);
    });

    it("Shouldn't transfer token because not reached the minimum amount of token minted (6)", async function () {
      await expect(
        this.coffe
          .connect(this.addrs[1])
          .transferFrom(this.addrs[1].address, this.addrs[10].address, 0)
      ).to.be.revertedWith("Coffe: insufficient tokens minted");
    });

    it("Should mint token #7 to Address 6", async function () {
      const tx = await this.coffe.mint(this.addrs[6].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(7);
      expect(await this.coffe.balanceOf(this.addrs[8].address)).to.eq(1);
    });

    it("Should mint token #8 to Address 7", async function () {
      const tx = await this.coffe.mint(this.addrs[7].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(8);
      expect(await this.coffe.balanceOf(this.addrs[7].address)).to.eq(1);
    });

    it("Should mint token #9 to Address 9", async function () {
      const tx = await this.coffe.mint(this.addrs[9].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(9);
      expect(await this.coffe.balanceOf(this.addrs[9].address)).to.eq(1);
    });

    it("Shouldn't transfer token because not reached the minimum amount of token minted (9)", async function () {
      await expect(
        this.coffe
          .connect(this.addrs[1])
          .transferFrom(this.addrs[1].address, this.addrs[10].address, 0)
      ).to.be.revertedWith("Coffe: insufficient tokens minted");
    });

    it("Should mint token #10 to Address 1", async function () {
      const tx = await this.coffe.mint(this.addrs[1].address);
      await tx.wait();

      expect(await this.coffe.totalSupply()).to.eq(10);
      expect(await this.coffe.balanceOf(this.addrs[1].address)).to.eq(2); // 2 tokens!
    });

    it("Should transfer token because min amount of token minted was reached", async function () {
      await this.coffe
        .connect(this.addrs[1])
        .transferFrom(this.addrs[1].address, this.addrs[10].address, 0);
      expect(await this.coffe.balanceOf(this.addrs[1].address)).to.eq(1);
      expect(await this.coffe.balanceOf(this.addrs[10].address)).to.eq(1);
    });
  });

  describe("Pause and unpause", function () {
    // it("Shouldn't pause contract because caller is not owner", async function () {});
    // it("Shouldn't unpause contract because caller is not owner", async function () {});
    // it("Should pause contract", async function () {});
    // it("Shouldn't pause contract because contract is already paused", async function () {});
    // it("Shouldn't mint token because contract is paused", async function () {});
    // it("Shouldn't transfer token because contract is paused", async function () {});
    // it("Should unpause contract", async function () {});
    // it("Shouldn't unpause contract because contract is already unpaused", async function () {});
  });
});
