# Data Sheet for PDF generation microservice.
route: The route for generating a PDF will be /pdf (ex: localhost:4000/pdf).

i). For Transaction state (TS)
The body of the endpoint would look like this

{
"TEMPLATE":"ts",
"BL":"Yes",
"SL":"Yes",
"BR":"No",
}

BL: Buyer authorized under DSCSA with state/Federal license
SL: Seller authorized under DSCSA with state/Federal license
BR: Buyer received TI & TS (transaction information & transaction statement of the seller)?

ii). For Transaction Information (TI)

{
"TEMPLATE":"ti",
"TD":1555574787096,
"SD":1555574787096,
"SN":"ABC",
"SA":"XYZ",
"BN":"LMN",
"BA":"PQR",
"ND":"crocin",
"NDC":"CRC600",
"SOD":"600 mg",
"DF":"1 nos",
"LN":"LOT 101",
"NC":"1",
"CS":100000
}

TD :Transaction Date (string/numeric)
SD :Shipping Date (string/numeric)
SN :Seller Name
SA :Seller Address
BN :Buyer Name
BA :Buyer Address
ND :Name of the drug
NDC :National Drug Code Number of the drug
SOD :Strength of the drug
DF :Dosage form of the drug
LN :LOT nnumber of the drug
NC :Number of container
CS :Container Size

iii). For Transaction History (TH)

[
{
"TD":1555574787096,
"RD":"1555322956",
"SD":"1555322956",
"SN":"ABC",
"SA":"XYZ",
"BN":"LMN",
"BA":"PQR",
"ND":"crocin",
"NDC":"CRC600",
"SOD":"600 mg",
"DF":"1 nos",
"LN":"LOT 101",
"NC":"1",
"CS":100000
} ,
{
"BRAND": "RANBAXY",
"TD":1555574787096,
"RD":"1555322956",
"SD":"1555322956",
"SN":"ABC",
"SA":"XYZ",
"BN":"LMN",
"BA":"PQR",
"ND":"crocin",
"NDC":"CRC600",
"SOD":"600 mg",
"DF":"1 nos",
"LN":"LOT 101",
"NC":"1",
"CS":100000
}
]

TD: Transaction Date (numeric)
SD: Shipping Date (numeric)
SN: Seller Name
SA: Seller Address
BN: Buyer Name
BA: Buyer Address
ND: Name of the drug
NDC: National Drug Code Number of the drug
SOD: Strength of the drug
DF: Dosage form of the drug
LN: LOT number of the drug
NC: Number of containers
CS: Container Size
