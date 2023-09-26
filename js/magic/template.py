f = open('array2.txt', 'r')

array = []

for l in f:
    l = l.strip()
    row = []
    for casilla in l.split("\t"):
        row.append(casilla)
    array.append(row)

f.close()

header = []
header2 = []

uos = []

headerSet = []
header2Set = []


for i in range(1, len(array)):
    for n in array[1]:
        header.append(n)
        if(not n in headerSet):
            headerSet.append(n)

    for n in array[2]:
        header2.append(n)
        if(not n in header2Set):
            header2Set.append(n)

    uos.append(array[i][0])


##print(header)
##print(header2)
##
##print(headerSet)
##print(header2Set)
##print(uos)

def getCol(subject, t):
    index = header.index(subject)
    for i in range(index, len(header2)):
        if(t == header2[i]):
            return i
    return -1

def getUos(col, group):
    res = []
    for i in range(3, len(array)):
        if(str(group) == array[i][col]):
            res.append(array[i][0])

    return res

print(headerSet)
print(header2Set)

def work(subject, tipo, grupo):
    # 15 sew
    a = headerSet[subject]
    b = header2Set[tipo]

    res = getUos(getCol(a, b), grupo)

    print(array[1][getCol( a, b)], " ", array[2][getCol( a, b)], grupo, " ",  len(res), " ",res)

##work(7,2,4)
##work(15,4,6)
## # SI PLs
##work(18,4,3)
##work(18,4,7)
##work(18,4,8)
##work(18,4,7)
##work(18,4,8)
##
for i in range(1,11):
    work(17,4,i)

##work(17,4,5)
##work(17,4,8)
##work(17,4,1)
##work(17,4,10)
##
##work(16,3,4)
##work(16,3,2)
