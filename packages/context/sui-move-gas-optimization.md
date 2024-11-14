# Sui Move Gas Optimization

This article provides a guide for gas optimization in Sui Move smart contracts collected from several sources.

The gas used by a transaction consists of summing the gas associated with the size of its payload (payload gas), the virtual machine instructions it executes (instruction gas), and the global storage it accesses (storage gas):

- **Payload gas** - transaction size gas, the cost of publishing bytecode to the Sui blockchain.
- **Instruction gas** - the cost of performing a transaction on the Sui blockchain.
- **Storage gas** - the cost for writing and accessing Sui global storage resources.

 # Gas Optimization Patterns

This section provides both general principles and specific design patterns for optimizing gas consumption in Move smart contracts on Sui. Each principle is accompanied by an example smart contract demonstrating its application.

### Minimize Vector Element Operations

Vector operations charge gas on a per-element basis, and are more expensive than operations on local variables. Thus, accessing vectors can be treated like accessing the global state.


**Bad Pattern - 94 MIST** 
```
    public entry fun bad_vector() {
        let mut vec = vector::empty<u64>();
        vector::push_back(&mut vec, 1);
        let mut k: u64 = 0;
        while (k < 1000) {
            k = k+*vector::borrow(&vec, 0);
        };
    }
```

**Good Pattern - 71 MIST**
```
    public entry fun good_vector() {
        let mut vec = vector::empty<u64>();
        vector::push_back(&mut vec, 1);
        let increment: u64 = *vector::borrow(&vec, 0);
        let mut k: u64 = 0;
        while (k < 1000) {
            k = k+increment;
        };
    }
```
