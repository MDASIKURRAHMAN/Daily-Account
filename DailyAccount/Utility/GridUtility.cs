using DailyAccount.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DailyAccount.Utility
{
    public class GridUtility
    {
        public static async Task<PaginatedAndSortedDataViewModel<T>> GetPaginatedAndSortedDataAsync<T>(
          IQueryable<T> queryable,
          int elementPerPage,
          int page,
          string sort,
          Func<T, bool> filter = null)
        {
            string[] sortParams = sort.Replace("\"", "").Split(',');
            string sortColumn = sortParams[0];
            string sortOrder = sortParams[1];
            int skip = (page - 1) * elementPerPage;
            if (filter != null)
            {
                queryable = queryable.Where(filter).AsQueryable();
            }
            int totalRowCount = await queryable.CountAsync();
            if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortOrder))
            {
                var fromfunction = GetSortingPredicate<T>(sortColumn);
                queryable = sortOrder == "asc" ? queryable.OrderBy(fromfunction).AsQueryable()
                          : queryable.OrderByDescending(fromfunction).AsQueryable();
            }
            var data = queryable.Skip(skip).Take(elementPerPage).ToList();
            return new PaginatedAndSortedDataViewModel<T>
            {
                Success = true, 
                LastRow = totalRowCount - 1,
                Data = data
            };
        }

        private static Func<T, object?>? GetSortingPredicate<T>(string propertyName)
        {
            const BindingFlags bindingAttr = BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance;
            if (typeof(T).GetProperty(propertyName, bindingAttr) is not null)
            {
                return x =>
                {
                    var property = x.GetType().GetProperty(propertyName, bindingAttr);
                    if (property is null) return null;
                    else
                    {
                        return property.PropertyType.Name switch
                        {
                            "String" => property is not null ? property
                            .GetValue(x)?.ToString().Trim().ToLower() : null,
                            _ => property.GetValue(x, null)
                        };
                    }
                };
            }
            return null;
        }
    }
}

