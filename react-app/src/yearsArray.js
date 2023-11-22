
export function generateYears(startYear = 2000, endYear) {
 const endDate = new Date().getFullYear()
 let years = []
 for(let i = startYear; i <= endDate; i++) {
 years.push(i)
 }
 return years.sort((a,b) => b-a)
}

generateYears()