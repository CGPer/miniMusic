import { request } from "@/network/request.js"

export default function getTop100List() {
  return request({
    url: "top",
  })
}