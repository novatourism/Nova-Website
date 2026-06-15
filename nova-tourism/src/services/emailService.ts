// nova-tourism/src/services/emailService.ts
import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'service_6n7n9rr'
const TEMPLATE_ID = 'template_47h9ebn'
const PUBLIC_KEY  = 'fe7JPHNmpZ8OKS3F6'

export interface EnquiryData {
  name: string
  email: string
  phone: string
  message: string
  package_interest?: string
}

export async function sendEnquiryEmail(data: EnquiryData): Promise<void> {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name:        data.name,
        name:             data.name,
        from_email:       data.email,
        email:            data.email,
        phone:            data.phone || 'Not provided',
        package_interest: data.package_interest || 'General Enquiry',
        message:          data.message || 'No message',
        to_email:         'novatourism.info@gmail.com',
      },
      PUBLIC_KEY
    )
    console.log('EmailJS success:', result)
  } catch (err) {
    console.error('EmailJS error:', JSON.stringify(err))
    throw err
  }
}