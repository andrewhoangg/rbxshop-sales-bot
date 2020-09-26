		private async Task<string> a(bool useEvents)
		{
			try
			{
				string text = "";
				foreach (Cookie cookie in await this.Task.session.client.GetCookies())
				{
					if (cookie.Name == "_abck")
					{
						text = cookie.Value;
					}
				}
				string text2 = "https://www.offspring.co.uk";
				string url = string.Format("https://xxxxxx.xxxxxxxxx.dev/sensor/generate?api_key={0}&license={1}&events={2}&userAgent={3}&url={4}&cookie={5}", new object[]
				{
					Data.gpubak(),
					MainWindow.botSettings.LicenseKey,
					useEvents,
					this.Task.userAgent,
					text2,
					text
				});
				NetworkResponse networkResponse = await this.Task.session.GetSoleApi(url, null);
				if (!networkResponse.Error)
				{
					JObject jobject = JObject.Parse(networkResponse.Body);
					if (jobject.ContainsKey("status") && jobject["status"].ToObject<string>() == "success")
					{
						JObject jobject2 = new JObject();
						jobject2["sensor_data"] = jobject["sensor_data"].ToObject<string>();
						TaskAwaiter<NetworkResponse> taskAwaiter = this.Task.session.PostSensor(this.Task.akamaiUrl, jobject2.ToString(), text2).GetAwaiter();
						if (!taskAwaiter.IsCompleted)
						{
							await taskAwaiter;
							TaskAwaiter<NetworkResponse> taskAwaiter2;
							taskAwaiter = taskAwaiter2;
							taskAwaiter2 = default(TaskAwaiter<NetworkResponse>);
						}
						taskAwaiter.GetResult();
						string result = null;
						foreach (Cookie cookie2 in await this.Task.session.client.GetCookies())
						{
							if (cookie2.Name == "_abck")
							{
								result = cookie2.Value;
							}
						}
						return result;
					}
				}
				text = null;
				text2 = null;
			}
			catch
			{
			}
			return null;
		}