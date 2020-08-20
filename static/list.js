const List = Object.create(null);

List.reverse = (l) => l.slice().reverse();

/**
 * Array with entryies from 0 to n - 1
 */
List.sequence = (n) => Array.from(new Array(n).keys());

List.transpose = (list) => list[0].map(
    (ignore, j) => list.map((l_i) => l_i[j])
);

List.zip = (...lists) => List.transpose(lists);

export default Object.freeze(List);