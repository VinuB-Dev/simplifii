import axios from 'axios'

export async function acceptRejectImage({
  image_id,
  application_id,
  applicant_id,
  url,
  action,
}) {
  try {
    const response = await axios.post('https://enc5ji1zrhmo.x.pipedream.net/', {
      image_id: image_id,
      application_id: application_id,
      applicant_id: applicant_id,
      url:
        url +
        `?token=7897978&application_id=${application_id}&applicant_id=${applicant_id}&title=${document.title}`,
      action: action,
    })
    return response.data
  } catch (err) {
    return {
      success: false,
      error: {
        message: err,
      },
    }
  }
}
