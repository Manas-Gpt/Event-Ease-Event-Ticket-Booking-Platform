import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Ticket } from '../types';

export const generateTicketPDF = async (ticket: Ticket): Promise<void> => {
  // Create a temporary element to render the ticket
  const ticketElement = document.createElement('div');
  ticketElement.innerHTML = `
    <div style="
      width: 600px; 
      padding: 40px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: Arial, sans-serif;
      border-radius: 20px;
      margin: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    ">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 32px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🎫 EVENT EASE</h1>
        <p style="font-size: 14px; margin: 5px 0; opacity: 0.9;">Concert Ticket</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 25px;">
          <div style="flex: 1;">
            <h2 style="font-size: 24px; margin: 0 0 10px 0; color: #fff;">${ticket.concert.title}</h2>
            <p style="font-size: 18px; margin: 5px 0; opacity: 0.9;">by ${ticket.concert.artist}</p>
          </div>
          <div style="text-align: right;">
            <div style="background: rgba(255,255,255,0.2); padding: 10px 15px; border-radius: 8px; font-weight: bold;">
              $${ticket.price.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
          <div>
            <p style="margin: 8px 0; opacity: 0.8;"><strong>📅 Date:</strong> ${new Date(ticket.concert.date).toLocaleDateString()}</p>
            <p style="margin: 8px 0; opacity: 0.8;"><strong>⏰ Time:</strong> ${ticket.concert.time}</p>
          </div>
          <div>
            <p style="margin: 8px 0; opacity: 0.8;"><strong>📍 Venue:</strong> ${ticket.concert.venue}</p>
            <p style="margin: 8px 0; opacity: 0.8;"><strong>🎟️ Type:</strong> ${ticket.ticketType}</p>
          </div>
        </div>
        
        <div style="border-top: 2px dashed rgba(255,255,255,0.3); padding-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="margin: 5px 0; font-size: 12px; opacity: 0.7;">Ticket ID</p>
              <p style="margin: 0; font-family: monospace; font-weight: bold;">${ticket.id}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 5px 0; font-size: 12px; opacity: 0.7;">Purchase Date</p>
              <p style="margin: 0; font-size: 14px;">${new Date(ticket.purchaseDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
          <p style="font-size: 12px; opacity: 0.7; margin: 0;">This ticket is valid for entry to the specified event.</p>
          <p style="font-size: 12px; opacity: 0.7; margin: 5px 0 0 0;">Please arrive 30 minutes before the event starts.</p>
        </div>
      </div>
    </div>
  `;

  // Add to document temporarily
  document.body.appendChild(ticketElement);

  try {
    // Convert to canvas
    const canvas = await html2canvas(ticketElement, {
      width: 680,
      height: 500,
      scale: 2,
      backgroundColor: null,
    });

    // Create PDF
    const pdf = new jsPDF('l', 'mm', [180, 120]);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, 160, 100);
    
    // Download PDF
    pdf.save(`Event-Ease-Ticket-${ticket.concert.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(ticketElement);
  }
};

export const generateAllTicketsPDF = async (tickets: Ticket[]): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let isFirstPage = true;

  for (const ticket of tickets) {
    if (!isFirstPage) {
      pdf.addPage();
    }

    // Create ticket element
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
      <div style="
        width: 500px; 
        padding: 30px; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: Arial, sans-serif;
        border-radius: 15px;
        margin: 20px;
      ">
        <h2 style="text-align: center; margin-bottom: 20px;">🎫 ${ticket.concert.title}</h2>
        <p><strong>Artist:</strong> ${ticket.concert.artist}</p>
        <p><strong>Date:</strong> ${new Date(ticket.concert.date).toLocaleDateString()}</p>
        <p><strong>Venue:</strong> ${ticket.concert.venue}</p>
        <p><strong>Price:</strong> $${ticket.price.toFixed(2)}</p>
        <p><strong>Ticket ID:</strong> ${ticket.id}</p>
      </div>
    `;

    document.body.appendChild(ticketElement);

    try {
      const canvas = await html2canvas(ticketElement, { scale: 1.5 });
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 20, 20, 170, 120);
    } finally {
      document.body.removeChild(ticketElement);
    }

    isFirstPage = false;
  }

  pdf.save('Event-Ease-All-Tickets.pdf');
};