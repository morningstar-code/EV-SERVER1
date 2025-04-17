RegisterNetEvent('phone:addnotification')
AddEventHandler('phone:addnotification', function(name, message)
  SendUIMessage({
    source = "ev-nui",
    app = "phone",
    data = {
      action = "email-receive",
      subject = name,
      body = message
    }
  })
end)

RegisterNetEvent('phone:emailReceived')
AddEventHandler('phone:emailReceived', function(sender, subject, body)
  SendUIMessage({
    source = "ev-nui",
    app = "phone",
    data = {
      action = "email-receive",
      sender = sender,
      subject = subject,
      body = body
    }
  })
end)

RegisterNetEvent('phone:notification')
AddEventHandler('phone:notification', function(title, message, forced, app)
  SendUIMessage({
    source = "ev-nui",
    app = "phone",
    data = {
      action = "notification",
      target_app = app or "home-screen",
      title = title,
      body = message,
      show_even_if_app_active = forced and true or false
    }
  })
end)
