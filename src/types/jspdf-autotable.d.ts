declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: {
      head?: any[][]
      body?: any[][]
      startY?: number
      styles?: any
      headStyles?: any
      alternateRowStyles?: any
      columnStyles?: any
      margin?: any
      didDrawPage?: (data: any) => void
    }) => jsPDF
  }
}

declare module 'jspdf-autotable' {
  // This module extends jsPDF with autoTable functionality
}
