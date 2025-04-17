## HOW-TO USE

## Business Transaction (Only use this for personal account -> business account)
```
exports["ev-financials"]:DoBusinessTransaction()
```

<hr />

## Cash Transaction (If you wanna deposit money into account from a cash purchase)
```
exports["ev-financials"]:DoCashTransaction(pSource, pTargetAccountId, pTaxCategory, pAmount, pTransactionType, pTransactionLog, pLogType, pCallback, pDontRemoveMoney)
```

## Parameters:

#### pSource: The source of the transaction (Player)
#### pTargetAccountId: The account id of the target account or business
#### pTaxCategory: The tax category of the transaction (1 = No Tax, 2 = Services, 3 = Vehicle Sales, 4 = Goods, 5 = Gas, 6 = Personal Income, 7 = Vehicle Registration Tax, 8 = Property Tax)
#### pAmount: The amount to charge the pSource and add to the target account
#### pTransactionType: The type of transaction (deposit, withdraw, transfer, payslip, venmo, purchase, forfeiture, grant, fine, loan)
#### pTransactionLog: The transaction log (e.g. "You have been paid $100 by John Doe")
#### pLogType: Ignore this, put it to false
#### pCallback: The callback function to call when the transaction is complete (Usually ignore this, set to false)
#### pDontRemoveMoney: If you dont wanna charge the pSource of money then set this to true

<br />

## Example:
#### local success = exports["ev-financials"]:DoCashTransaction(source, targetAccountId, 1, 100, "deposit", "You have been paid $100 by John Doe", false, false, false)

<hr />

## Job Pay Transaction (If you wanna deposit money into account from payslip etc)
```
exports["ev-financials"]:DoJobPayTransaction(pTargetAccountId, pAmount, pComment)
```

## Parameters:

#### pTargetAccountId: The account id of the target account or business
#### pAmount: The amount to add to the target account
#### pComment: The comment to add to the transaction log

<br />

## Example:
#### local success = exports["ev-financials"]:DoJobPayTransaction(targetAccountId, 100, "You have been paid $100 by John Doe")

<hr />

## Get a businesses account id
```
exports["ev-financials"]:getBusinessAccountId(pBusinessId)
```

## Parameters:

#### pBusinessId: The business id of the business you want to get the account id of 

<br />

## Example:
#### local success, businessAccountId = exports["ev-financials"]:getBusinessAccountId("casino")

<hr />

# Get a players default bank account
```
exports["ev-financials"]:getDefaultBankAccount(pCharacterId, singleReturn, pIgnoreFrozenCheck)
```

## Parameters:

#### pCharacterId: The character id of the player you want to get the default bank account of
#### singleReturn: If you want to return the account id only, set this to true
#### pIgnoreFrozenCheck: If you want to ignore the frozen check, set this to true (will return account frozen if not ignored)

<br />

## Example:
#### local success, defaultBankAccountId = exports["ev-financials"]:getDefaultBankAccount(characterId, true, false)

<hr />