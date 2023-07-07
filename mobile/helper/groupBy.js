import {
    formatDate,
    formatMonth,
    formatYear,
    formatTime,
} from './humanReadable';

export const groupByDate = (items, by) => {
    let formatFunc = formatTime;
    if (by === 'date') formatFunc = formatDate;
    if (by === 'month') formatFunc = formatMonth;
    if (by === 'year') formatFunc = formatYear;

    return items
        .map((item) => {
            return {
                amount: item.amountToStore.$numberDecimal,
                createdAt: formatFunc(item.createdAt),
            };
        })
        .reduce((acc, value) => {
            let i = 0;
            let flag = false;

            while (i < acc.length) {
                if (acc[i][0] == value.createdAt) {
                    acc[i][1] = parseFloat(acc[i][1]) + parseFloat(value.amount);
                    flag = true;
                    i = acc.length;
                }
                else i++;
            }

            if (!flag) acc.push([value.createdAt, value.amount]);
            return acc;
        }, []);
};

export const groupBySold = (items, by, sliceEnd) => {
    return items
        .slice(0, sliceEnd)
        .map((item) => {
            return {
                name: item.name,
                sold: item.sold,
            };
        })
        .reduce((acc, value) => {
            let i = 0;
            let flag = false;

            while (i < acc.length) {
                if (acc[i][0] == value.name) {
                    acc[i][1] = parseFloat(acc[i][1]) + parseFloat(value.sold);
                    flag = true;
                    i = acc.length;
                }
                else i++;
            }

            if (!flag) acc.push([value.name, value.sold]);
            return acc;
        }, []);
};

export const groupByStyle = (listValues) => {
    let output = [];
    listValues.forEach((value) => {
        let flag = true;
        output.forEach((list) => {
            if (value.styleId._id === list[0].styleId._id) {
                list.push(value);
                flag = false;
            }
            list.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        });
        if (flag) output.push([value]);
    });
    return output;
}