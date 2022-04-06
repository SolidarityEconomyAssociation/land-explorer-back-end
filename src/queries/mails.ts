const { QueryTypes } = require('sequelize');
const { sequelize, User, Map, UserMap, PendingUserMap } = require('./database');
const bcrypt = require('bcrypt');

let loginLink = "https://app.landexplorer.cc/auth/";
let sender = "no-reply@landexplorer.cc";
let senderName = "Land Explorer";

export const sendRegisterEmail = async (recipient: string, name: string) => {
  let body = "Dear " + capitalizeFirstLetter(name) + ",";
  body += "<br /><br />Thank you for registering with Land Explorer.";
  body += "<br />You can <a href=\""+ loginLink + "\">login here</a>.";
  body += "<br />We're excited to see how you use this tool, to find information on the land around you!";
  body += "<br /><br />Many thanks,";
  body += "<br />The Shared Assets Team";

  // mail = new MailMessage();

  // //Setting From , To and CC
  // mail.From = new MailAddress(sender, senderName);
  // mail.To.Add(new MailAddress(recipient));
  // mail.Subject = "Your Land Explorer Registration";
  // mail.Body = body;
  // mail.BodyEncoding = System.Text.Encoding.UTF8;
  // mail.IsBodyHtml = true;

  // smtpClient.Send(mail);
}

export const resetPassword = async (recipient: string, name: string, newPassword: string) => {
  let body = "Dear " + capitalizeFirstLetter(name) + ",";
  body += "<br /><br />Here is your new password: " + newPassword;
  body += "<br />You can <a href=\"" + loginLink + "\">login here</a>.";
  body += "<br />You can change your password to something more memorable in My Account, once logged in.";
  body += "<br /><br />Many thanks,";
  body += "<br />The Shared Assets Team";

  // mail = new MailMessage();

  // //Setting From , To and CC
  // mail.From = new MailAddress(sender, senderName);
  // mail.To.Add(new MailAddress(recipient));
  // mail.Subject = "Your Land Explorer Password";
  // mail.Body = body;
  // mail.BodyEncoding = System.Text.Encoding.UTF8;
  // mail.IsBodyHtml = true;

  // smtpClient.Send(mail);
}

export const resetPasswordNotFound = async (recipient: string) => {

  let body = "Hi,";
  body += "<br /><br />You received this message because you requested for a Land Explorer account password reset.";
  body += "<br />However, there is no Land Explorer account associated with this email.";
  body += "<br />If you requested this password reset, a different email address might have been used for the Land Explorer account.";
  body += "<br /><br />Many thanks,";
  body += "<br />The Shared Assets Team";

  // mail = new MailMessage();

  // //Setting From , To and CC
  // mail.From = new MailAddress(sender, senderName);
  // mail.To.Add(new MailAddress(recipient));
  // mail.Subject = "Your Land Explorer Password";
  // mail.Body = body;
  // mail.BodyEncoding = System.Text.Encoding.UTF8;
  // mail.IsBodyHtml = true;

  // smtpClient.Send(mail);
}

export const shareMapRegistered = async (
  recipient_email: string,
  recipient_firstname: string,
  sharer_fullname: string,
  sharer_firstname: string,
  map_name: string,
  ) => {

    let body = "<!DOCTYPE html><html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>'";
    body += "<p>Dear " + capitalizeFirstLetter(recipient_firstname) + ",</p>";
    body += "<p>" + capitalizeFirstLetter(sharer_fullname) + " has invited you to join Land Explorer and has given you access to their map: " + map_name + "</p>";
    body += "<p>You can register for an account by clicking <a href=\"" + loginLink + "\">here</a>.</p>";
    body += "<p>Once logged in, you can then view the map " + capitalizeFirstLetter(sharer_firstname) + " shared with you.</p>";
    body += "<p>Many thanks,<br/><br/>The Shared Assets Team</p>";
    body += "</body></html>";

    // mail = new MailMessage();

    // ////Setting From , To and CC
    // mail.From = new MailAddress(sender, senderName);
    // mail.To.Add(new MailAddress(recipient_email));
    // mail.Subject = "You’re invited to join " + helperFunctions.UppercaseFirst(sharer_fullname) + " on Land Explorer";
    // mail.Body = body;
    // mail.BodyEncoding = System.Text.Encoding.UTF8;
    // mail.IsBodyHtml = true;

    // smtpClient.Send(mail);
}



export const shareMapUnregistered = async (
  recipient_email: string,
  sharer_fullname: string,
  sharer_firstname: string,
  map_name: string,
  ) => {

    let body = "<!DOCTYPE html><html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>'";
    body += "<p>Hi There,</p>";
    body += "<p>" + capitalizeFirstLetter(sharer_fullname) + " has invited you to join Land Explorer and has given you access to their map: " + map_name + "</p>";
    body += "<p>You can register for an account by clicking <a href=\"" + loginLink + "\">here</a>.</p>";
    body += "<p>Once logged in, you can then view the map " + capitalizeFirstLetter(sharer_firstname) + " shared with you.</p>";
    body += "<p>Many thanks,<br/><br/>The Shared Assets Team</p>";
    body += "</body></html>";

    // mail = new MailMessage();

    // ////Setting From , To and CC
    // mail.From = new MailAddress(sender, senderName);
    // mail.To.Add(new MailAddress(recipient_email));
    // mail.Subject = "You’re invited to join " + capitalizeFirstLetter(sharer_fullname) + " on Land Explorer";
    // mail.Body = body;
    // mail.BodyEncoding = System.Text.Encoding.UTF8;
    // mail.IsBodyHtml = true;

    // smtpClient.Send(mail);
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}