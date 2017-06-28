/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */

/**
 * Return the query to fetch the data of the dataset
 * @export
 * @param {string} tableName Name of the table
 * @param {{ name: string, type: string, value: any[] }[]} [filters=[]]
 * @param {{ key: string, value: string, as?: boolean, aggregateFunction: string, group: boolean }} [arrColumns=[]]
 * @param {any} [arrOrder=[]]
 * @returns {string} SQL query
 */
export default function getQueryByFilters(
  tableName,
  filters = [],
  arrColumns = [],
  arrOrder = []
) {
  // We compute the WHERE part of the query which corresponds
  // to the filters
  const filtersQuery = filters.map((filter) => {
    if (!filter.value || !filter.value.length) return null;

    if (filter.type === 'string') {
      return `${filter.name} IN ('${filter.value.join('\', \'')}')`;
    }

    if (filter.type === 'number') {
      return `${filter.name} >= ${filter.value[0]} AND ${filter.name} <= ${filter.value[1]}`;
    }

    return null;
  }).filter(filter => !!filter)
    .join(' AND ');

  // Get column names
  let columns = '*';
  if (arrColumns.length) {
    columns = arrColumns.map((column) => {
      let res = `${column.value}`;

      // We eventually apply a aggregate function to the column
      if (column.aggregateFunction) {
        res = `${column.aggregateFunction.toUpperCase()}(${res})`;
      }

      // We eventually rename the column
      if (column.as) {
        res = `${res} as ${column.key}`;
      }

      return res;
    }).join(', ');
  }

  let orderBy = '';
  if (arrOrder.length) {
    const orders = arrOrder.map(order => order.name).join(' ');

    orderBy = `ORDER BY ${orders}`;
  }

  const where = (filtersQuery.length) ? `WHERE ${filtersQuery}` : '';

  // The column used to group the data, if exist
  const groupingColumn = arrColumns.find(col => col.group);

  let groupBy = '';
  if (groupingColumn) {
    groupBy = `GROUP BY ${groupingColumn.key}`;
  }

  return `SELECT ${columns} FROM ${tableName} ${where} ${groupBy} ${orderBy}`;
}