import * as XLSX from 'xlsx';

class ExportService {
  /**
   * Export data to Excel file
   * @param {Object} data - Data to export
   * @param {string} fileName - Name of the file without extension
   */
  exportToExcel(data, fileName) {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Process stats data
      if (data.stats) {
        const statsData = Object.entries(data.stats).map(([key, value]) => ({
          Metric: this.formatMetricName(key),
          Value: value
        }));
        const statsSheet = XLSX.utils.json_to_sheet(statsData);
        XLSX.utils.book_append_sheet(workbook, statsSheet, 'Statistics');
      }

      // Process leads data
      if (data.recentLeads && data.recentLeads.length > 0) {
        const leadsData = data.recentLeads.map(lead => ({
          Name: lead.name,
          Type: lead.type,
          Status: lead.status,
          Date: lead.date,
          Email: lead.email || '',
          Phone: lead.phone || '',
          Source: lead.source || '',
          Notes: lead.notes || ''
        }));
        const leadsSheet = XLSX.utils.json_to_sheet(leadsData);
        XLSX.utils.book_append_sheet(workbook, leadsSheet, 'Recent Leads');
      }

      // Process tickets data
      if (data.recentTickets && data.recentTickets.length > 0) {
        const ticketsData = data.recentTickets.map(ticket => ({
          Title: ticket.title,
          Status: ticket.status,
          Priority: ticket.priority,
          Date: ticket.date,
          AssignedTo: ticket.assignedTo || '',
          Category: ticket.category || '',
          Description: ticket.description || ''
        }));
        const ticketsSheet = XLSX.utils.json_to_sheet(ticketsData);
        XLSX.utils.book_append_sheet(workbook, ticketsSheet, 'Recent Tickets');
      }

      // Generate Excel file
      XLSX.writeFile(workbook, `${fileName}.xlsx`);

      return true;
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw new Error('Failed to export data to Excel');
    }
  }

  /**
   * Format metric names for better readability
   * @param {string} key - Metric key
   * @returns {string} Formatted metric name
   */
  formatMetricName(key) {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  /**
   * Export data to CSV format
   * @param {Object} data - Data to export
   * @param {string} fileName - Name of the file without extension
   */
  exportToCSV(data, fileName) {
    try {
      // Convert data to CSV format
      const csvContent = this.convertToCSV(data);
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      throw new Error('Failed to export data to CSV');
    }
  }

  /**
   * Convert data object to CSV format
   * @param {Object} data - Data to convert
   * @returns {string} CSV formatted string
   */
  convertToCSV(data) {
    const headers = [];
    const rows = [];

    // Process stats
    if (data.stats) {
      headers.push('Metric', 'Value');
      Object.entries(data.stats).forEach(([key, value]) => {
        rows.push([this.formatMetricName(key), value]);
      });
    }

    // Process leads
    if (data.recentLeads && data.recentLeads.length > 0) {
      const leadHeaders = ['Name', 'Type', 'Status', 'Date', 'Email', 'Phone', 'Source', 'Notes'];
      headers.push(...leadHeaders);
      data.recentLeads.forEach(lead => {
        rows.push([
          lead.name,
          lead.type,
          lead.status,
          lead.date,
          lead.email || '',
          lead.phone || '',
          lead.source || '',
          lead.notes || ''
        ]);
      });
    }

    // Process tickets
    if (data.recentTickets && data.recentTickets.length > 0) {
      const ticketHeaders = ['Title', 'Status', 'Priority', 'Date', 'AssignedTo', 'Category', 'Description'];
      headers.push(...ticketHeaders);
      data.recentTickets.forEach(ticket => {
        rows.push([
          ticket.title,
          ticket.status,
          ticket.priority,
          ticket.date,
          ticket.assignedTo || '',
          ticket.category || '',
          ticket.description || ''
        ]);
      });
    }

    // Convert to CSV string
    const csvRows = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ];

    return csvRows.join('\n');
  }
}

export const exportService = new ExportService();